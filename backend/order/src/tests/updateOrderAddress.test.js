const request = require('supertest');
const mongoose = require('mongoose');
const { initTestEnv, clearDatabase, closeTestEnv, createToken } = require('./testSetup');

let app;
let OrderModel;

describe('PATCH /api/order/:id/address', () => {
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

  const newAddress = {
    shippingAddress: {
      street: 'New Street 1',
      city: 'Newcity',
      state: 'NS',
      pincode: '56789',
      country: 'Neverland'
    }
  };

  test('updates address when order exists, belongs to user and is PENDING (200)', async () => {
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
      .patch(`/api/order/${order._id.toString()}/address`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAddress)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Order updated successfully');
    expect(res.body).toHaveProperty('order');
    expect(res.body.order.shippingAddress.city).toBe(newAddress.shippingAddress.city);

    const fresh = await OrderModel.findById(order._id);
    expect(fresh.shippingAddress.city).toBe(newAddress.shippingAddress.city);
  });

  test('returns 404 when order not found', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = createToken({ id: userId });

    const randomId = new mongoose.Types.ObjectId().toHexString();

    const res = await request(app)
      .patch(`/api/order/${randomId}/address`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAddress)
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
      .patch(`/api/order/${order._id.toString()}/address`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAddress)
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
      .patch(`/api/order/${order._id.toString()}/address`)
      .set('Authorization', `Bearer ${token}`)
      .send(newAddress)
      .expect(409);

    expect(res.body).toHaveProperty('message', 'Order cannot be cancelled at this stage');
  });

  test('returns 500 for malformed id', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = createToken({ id: userId });

    const res = await request(app)
      .patch('/api/order/invalid-id/address')
      .set('Authorization', `Bearer ${token}`)
      .send(newAddress)
      .expect(500);

    expect(res.body).toHaveProperty('message', 'Internal server error');
  });
});
