const request = require('supertest');
jest.mock('../src/db/redis', () => ({ get: jest.fn().mockResolvedValue(null) }));
jest.mock('../src/services/imageKit.service', () => jest.fn().mockImplementation(async () => ({
  url: 'http://example.com/image.jpg',
  thumbnail: 'http://example.com/thumb.jpg',
  fileId: 'file123'
})));

const app = require('../src/app');
const productModel = require('../src/models/product.model');
const mongoose = require('mongoose');

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('GET /api/products/:id', () => {
  let product;
  beforeEach(async () => {
    await productModel.deleteMany({});
    product = await productModel.create({
      title: 'Sample',
      description: 'Sample desc',
      price: { amount: 10, currency: 'USD' },
      seller: new mongoose.Types.ObjectId(),
      img: []
    });
  });

  it('returns 400 for invalid ObjectId', async () => {
    const res = await request(app).get('/api/products/not-a-valid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid product id');
  });

  it('returns 404 when product not found', async () => {
    const missingId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${missingId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Product not found');
  });

  it('returns product when id exists', async () => {
    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('product');
    expect(res.body.product._id).toBe(String(product._id));
    expect(res.body.product.title).toBe('Sample');
  });
});
