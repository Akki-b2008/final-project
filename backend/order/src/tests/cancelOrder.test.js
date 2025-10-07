const request = require('supertest');
const mongoose = require('mongoose');
const { initTestEnv, clearDatabase, closeTestEnv, createToken } = require('./testSetup');

let app;
let OrderModel;

describe('POST /api/order/:id/cancel', () => {
  beforeAll(async () => {
    const env = await initTestEnv();
    app = env.app;
    OrderModel = env.OrderModel;
  });

  afterAll(async () => {
    await closeTestEnv();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await clearDatabase();
  });

  test('cancels a PENDING order (200)', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = await OrderModel.create({
      user: userId,
      items: [],
      totalPrice: { amount: 100, currency: 'INR' },
      status: 'PENDING',
      shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
    });

    const token = createToken({ id: userId });

    const res = await request(app)
      .post(`/api/order/${order._id.toString()}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Order cancelled successfully');
    expect(res.body).toHaveProperty('order');
    expect(res.body.order.status).toBe('CANCELLED');

    const fresh = await OrderModel.findById(order._id);
    expect(fresh.status).toBe('CANCELLED');
  });

  test('returns 404 when order not found', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = createToken({ id: userId });

    const randomId = new mongoose.Types.ObjectId().toHexString();

    const res = await request(app)
      .post(`/api/order/${randomId}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Order not found');
  });

  test('returns 403 when order belongs to another user', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const otherUser = new mongoose.Types.ObjectId().toHexString();

    const order = await OrderModel.create({
      user: otherUser,
      items: [],
      totalPrice: { amount: 20, currency: 'INR' },
      status: 'PENDING',
      shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
    });

    const token = createToken({ id: userId });

    const res = await request(app)
      .post(`/api/order/${order._id.toString()}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

  expect(res.body).toHaveProperty('message', 'Forbidden : Insufficient permissions');
  });

  test('returns 409 when order is not PENDING', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    const order = await OrderModel.create({
      user: userId,
      items: [],
      totalPrice: { amount: 20, currency: 'INR' },
      status: 'CONFIRMED',
      shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
    });

    const token = createToken({ id: userId });

    const res = await request(app)
      .post(`/api/order/${order._id.toString()}/cancel`)
      .set('Authorization', `Bearer ${token}`)
      .expect(409);

    expect(res.body).toHaveProperty('message', 'Order cannot be cancelled at this stage');
  });

  test('returns 500 for malformed id', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = createToken({ id: userId });

    const res = await request(app)
      .post('/api/order/invalid-id/cancel')
      .set('Authorization', `Bearer ${token}`)
      .expect(500);

    expect(res.body).toHaveProperty('message', 'Internal server error');
  });
});
