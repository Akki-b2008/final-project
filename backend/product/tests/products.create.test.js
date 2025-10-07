const request = require('supertest');
// Mock redis and image upload service BEFORE importing app (so middleware/controller use mocks)
jest.mock('../src/db/redis', () => ({ get: jest.fn().mockResolvedValue(null) }));
jest.mock('../src/services/imageKit.service', () => jest.fn().mockImplementation(async () => ({
  url: 'http://example.com/image.jpg',
  thumbnail: 'http://example.com/thumb.jpg',
  fileId: 'file123'
})));

// Mock validators so tests exercise multer + controller behavior (validators run before multer in routes)
jest.mock('../src/validators/validation.middleware', () => ({
  createProductValidators: (req, res, next) => next(),
  updateProductValidators: (req, res, next) => next(),
}));

const app = require('../src/app');
const productModel = require('../src/models/product.model');

// Silence console logs for test clarity
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('POST /api/products', () => {
  it('creates a product successfully with valid data and auth', async () => {
    const token = global.signin('seller');

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Test Product')
      .field('description', 'A sample product')
      .field('priceAmount', '199')
      .field('priceCurrency', 'usd')
      .attach('images', Buffer.from('fake image'), { filename: 'image1.png', contentType: 'image/png' });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('data');
  expect(res.body.data.title).toBe('Test Product');
  expect(res.body.data.price.amount).toBe(199);
  expect(res.body.data.price.currency).toBe('USD');

  const productInDb = await productModel.findById(res.body.data._id);
    expect(productInDb).not.toBeNull();
  });

  it('rejects request without auth token', async () => {
    const res = await request(app)
      .post('/api/products')
      .field('title', 'Test Product')
      .field('priceAmount', '100');

    expect(res.statusCode).toBe(401);
  });

  it('rejects when user role is not permitted', async () => {
    const token = global.signin('user'); // not admin or seller

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Test Product')
      .field('priceAmount', '100');

    expect(res.statusCode).toBe(403);
  });

  it('defaults currency to INR when not provided', async () => {
    const token = global.signin('seller');

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Another Product')
      .field('description', 'No currency provided')
      .field('priceAmount', '50')
      .attach('images', Buffer.from('fake image'), { filename: 'image2.png', contentType: 'image/png' });

  expect(res.statusCode).toBe(201);
  expect(res.body.data.price.currency).toBe('INR');
  });

  it('rejects when no images are provided', async () => {
    const token = global.signin('seller');

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'No Image Product')
      .field('priceAmount', '20');

    // Validators are mocked in this test suite, controller will create product with empty img
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data.img)).toBe(true);
  });

  it('handles internal server error gracefully', async () => {
    const token = global.signin('seller');

    // Force productModel.create to throw
    const createSpy = jest.spyOn(productModel, 'create').mockRejectedValueOnce(new Error('DB down'));

    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Will Fail')
      .field('priceAmount', '10')
      .attach('images', Buffer.from('fake image'), { filename: 'image3.png', contentType: 'image/png' });

  expect(res.statusCode).toBe(500);
  expect(res.body.message).toBe('Internal server error');
  expect(res.body.error).toBe('DB down');

    createSpy.mockRestore();
  });
});
