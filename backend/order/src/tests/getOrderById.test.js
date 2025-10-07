const request = require('supertest');
const mongoose = require('mongoose');
const { initTestEnv, clearDatabase, closeTestEnv, createToken } = require('./testSetup');

let app;
let OrderModel;

describe('GET /api/order/:id', () => {
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

  test('returns order when it exists and belongs to user (200)', async () => {
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
      .get(`/api/order/${order._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Order found successfully');
    expect(res.body).toHaveProperty('order');
    expect(res.body.order._id).toBe(order._id.toString());
    expect(res.body.order.user.toString()).toBe(userId);
  });

  test('returns 404 when order not found', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = createToken({ id: userId });

    // random but valid ObjectId
    const randomId = new mongoose.Types.ObjectId().toHexString();

    const res = await request(app)
      .get(`/api/order/${randomId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Order not found');
  });

  test('returns 403 when order exists but belongs to another user', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const otherUserId = new mongoose.Types.ObjectId().toHexString();

    const order = await OrderModel.create({
      user: otherUserId,
      items: [],
      totalPrice: { amount: 50, currency: 'INR' },
      status: 'PENDING',
      shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
    });

    const token = createToken({ id: userId });

    const res = await request(app)
      .get(`/api/order/${order._id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(res.body).toHaveProperty('message', 'Forbidden: You do not have access to this order');
  });

  test('returns 500 for malformed id', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = createToken({ id: userId });

    const res = await request(app)
      .get('/api/order/invalid-id')
      .set('Authorization', `Bearer ${token}`)
      .expect(500);

    expect(res.body).toHaveProperty('message', 'Internal server error');
  });
});
