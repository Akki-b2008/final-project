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

describe('DELETE /api/products/:id', () => {
  let sellerId;
  let otherSellerId;
  let product;

  beforeEach(async () => {
    await productModel.deleteMany({});
    sellerId = new mongoose.Types.ObjectId().toString();
    otherSellerId = new mongoose.Types.ObjectId().toString();
    product = await productModel.create({
      title: 'Delete Me',
      description: 'To be deleted',
      price: { amount: 99, currency: 'USD' },
      seller: sellerId,
      img: []
    });
  });

  it('returns 400 for invalid product id', async () => {
    const token = global.signin('seller', sellerId);
    const res = await request(app)
      .delete('/api/products/not-a-valid-id')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid product id');
  });

  it('returns 404 when product not found', async () => {
    const token = global.signin('seller', sellerId);
    const missingId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .delete(`/api/products/${missingId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Product not found');
  });

  it('returns 403 when deleting product of another seller', async () => {
    const token = global.signin('seller', otherSellerId);
    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Forbidden : You can only delete your products');
  });

  it('returns 403 when role is not seller (auth middleware)', async () => {
    const userToken = global.signin('user', sellerId);
    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403); // middleware forbidden
    expect(res.body.message).toBe('Forbidden: Insufficient permissions');
  });

  it('deletes product successfully for owning seller', async () => {
    const token = global.signin('seller', sellerId);
    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Product deleted successfully');

    const inDb = await productModel.findById(product._id);
    expect(inDb).toBeNull();
  });
});
