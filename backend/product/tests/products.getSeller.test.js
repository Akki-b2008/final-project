// Tests for GET /api/products/seller (getProductsBySeller)
const request = require('supertest');
const mongoose = require('mongoose');
jest.mock('../src/db/redis', () => ({ get: jest.fn().mockResolvedValue(null) }));
jest.mock('../src/services/imageKit.service', () => jest.fn().mockImplementation(async () => ({
  url: 'http://example.com/image.jpg',
  thumbnail: 'http://example.com/thumb.jpg',
  fileId: 'file123'
})));
const app = require('../src/app');
const productModel = require('../src/models/product.model');
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('GET /api/products/seller', () => {
  let sellerId;
  let otherSellerId;

  beforeEach(async () => {
    await productModel.deleteMany({});
    sellerId = new mongoose.Types.ObjectId().toString();
    otherSellerId = new mongoose.Types.ObjectId().toString();
  });

  async function createForSeller(id, count, prefix='Prod') {
    for (let i=0;i<count;i++) {
      await productModel.create({
        title: `${prefix}${i}`,
        description: 'Desc',
        price: { amount: 10 + i, currency: 'USD' },
        seller: id,
        img: []
      });
    }
  }

  it('returns 401 when no auth token is provided', async () => {
    const res = await request(app).get('/api/products/seller');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('returns 403 when role is not seller', async () => {
    const token = global.signin('user', sellerId);
    const res = await request(app)
      .get('/api/products/seller')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Forbidden: Insufficient permissions');
  });

  it('returns empty array when seller has no products', async () => {
    const token = global.signin('seller', sellerId);
    const res = await request(app)
      .get('/api/products/seller')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('returns only products for the authenticated seller', async () => {
    await createForSeller(sellerId, 3, 'Mine');
    await createForSeller(otherSellerId, 2, 'Other');
    const token = global.signin('seller', sellerId);
    const res = await request(app)
      .get('/api/products/seller')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    const titles = res.body.data.map(p => p.title).sort();
    expect(titles).toEqual(['Mine0','Mine1','Mine2']);
    const sellers = [...new Set(res.body.data.map(p => String(p.seller)))];
    expect(sellers).toEqual([sellerId]);
  });

  it('applies skip and limit', async () => {
    await createForSeller(sellerId, 5, 'Item');
    const token = global.signin('seller', sellerId);
    const res = await request(app)
      .get('/api/products/seller')
      .query({ skip: 1, limit: 2 })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it('caps limit at 20 even if larger provided', async () => {
    await createForSeller(sellerId, 25, 'Bulk');
    const token = global.signin('seller', sellerId);
    const res = await request(app)
      .get('/api/products/seller')
      .query({ limit: 50 })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(20);
  });
});
