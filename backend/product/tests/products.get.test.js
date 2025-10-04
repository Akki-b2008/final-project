const request = require('supertest');
// Mocks
jest.mock('../src/db/redis', () => ({ get: jest.fn().mockResolvedValue(null) }));
jest.mock('../src/services/imageKit.service', () => jest.fn().mockImplementation(async () => ({
  url: 'http://example.com/image.jpg',
  thumbnail: 'http://example.com/thumb.jpg',
  fileId: 'file123'
})));

const app = require('../src/app');
const productModel = require('../src/models/product.model');
const mongoose = require('mongoose');

// Silence console output
jest.spyOn(console, 'log').mockImplementation(() => {});

async function seedProducts() {
  const seller = new mongoose.Types.ObjectId();
  const docs = await productModel.insertMany([
    { title: 'Red Shirt', description: 'Bright red cotton shirt', price: { amount: 25, currency: 'USD' }, seller, img: [] },
    { title: 'Blue Shirt', description: 'Deep blue denim shirt', price: { amount: 40, currency: 'USD' }, seller, img: [] },
    { title: 'Green Pants', description: 'Comfortable green pants', price: { amount: 55, currency: 'USD' }, seller, img: [] },
    { title: 'Yellow Hat', description: 'Stylish yellow summer hat', price: { amount: 15, currency: 'USD' }, seller, img: [] },
  ]);
  return docs;
}

describe('GET /api/products', () => {
  beforeEach(async () => {
    await productModel.deleteMany({});
    // Force creation/sync of text index so $text queries don't throw (500)
    await productModel.syncIndexes();
  });

  it('returns all products without filters', async () => {
    await seedProducts();
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(4);
  });

  it('applies text search filter (q)', async () => {
    await seedProducts();
    const res = await request(app).get('/api/products').query({ q: 'Shirt' });
    // Red Shirt + Blue Shirt
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
    const titles = res.body.data.map(p => p.title).sort();
    expect(titles).toEqual(['Blue Shirt', 'Red Shirt']);
  });

  it('applies minprice and maxprice filters', async () => {
    await seedProducts();
    const res = await request(app).get('/api/products').query({ minprice: 20, maxprice: 50 });
    expect(res.statusCode).toBe(200);
    const amounts = res.body.data.map(p => p.price.amount).sort((a,b)=>a-b);
    expect(amounts).toEqual([25,40]);
  });

  it('supports skip and limit (capped at 20)', async () => {
    await seedProducts();
    const res = await request(app).get('/api/products').query({ skip: 1, limit: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it('caps limit to 20 even if larger provided', async () => {
    // create 25 products
    const seller = new mongoose.Types.ObjectId();
    for (let i=0;i<25;i++) {
      await productModel.create({ title: `Prod ${i}`, description: 'Bulk', price: { amount: i+1, currency: 'USD' }, seller, img: [] });
    }
    const res = await request(app).get('/api/products').query({ limit: 50 });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(20);
  });
});
