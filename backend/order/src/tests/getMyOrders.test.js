const request = require('supertest');
const mongoose = require('mongoose');
const { initTestEnv, clearDatabase, closeTestEnv, createToken } = require('./testSetup');

let app;
let OrderModel;

describe('GET /api/order/me', () => {
  beforeAll(async () => {
    const env = await initTestEnv();
    app = env.app;
    OrderModel = env.OrderModel;

    // The controller has a typo: uses .exac() instead of .exec().
    // Patch mongoose Query prototype for tests so controller works without modifying source.
    if (!mongoose.Query.prototype.exac) {
      mongoose.Query.prototype.exac = mongoose.Query.prototype.exec;
    }
  });

  afterAll(async () => {
    await closeTestEnv();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await clearDatabase();
  });

  test('returns only orders for authenticated user with pagination meta', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const otherUserId = new mongoose.Types.ObjectId().toHexString();

    // create 3 orders for user and 2 for other user
    const ordersForUser = [];
    for (let i = 0; i < 3; i++) {
      ordersForUser.push(await OrderModel.create({
        user: userId,
        items: [],
        totalPrice: { amount: 10 * (i + 1), currency: 'INR' },
        status: 'PENDING',
        shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
      }));
    }

    for (let i = 0; i < 2; i++) {
      await OrderModel.create({
        user: otherUserId,
        items: [],
        totalPrice: { amount: 99, currency: 'INR' },
        status: 'PENDING',
        shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
      });
    }

    const token = createToken({ id: userId });

    const res = await request(app)
      .get('/api/order/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Orders found successfully');
    expect(res.body).toHaveProperty('orders');
    expect(Array.isArray(res.body.orders)).toBe(true);
    // default limit is 10 so we should get all 3
    expect(res.body.orders.length).toBe(3);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta.total).toBe(3);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(10);

    // ensure returned orders belong to the user
    res.body.orders.forEach((o) => {
      expect(o.user.toString()).toBe(userId);
    });
  });

  test('applies pagination query params (page & limit)', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();

    // create 15 orders for user
    for (let i = 0; i < 15; i++) {
      await OrderModel.create({
        user: userId,
        items: [],
        totalPrice: { amount: i + 1, currency: 'INR' },
        status: 'PENDING',
        shippingAddress: { street: 'a', city: 'b', state: 'c', pincode: '1234', country: 'x' }
      });
    }

    const token = createToken({ id: userId });

    // request page 2 with limit 5 => should return 5 items (items 6-10)
    const res = await request(app)
      .get('/api/order/me?page=2&limit=5')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.orders.length).toBe(5);
    expect(res.body.meta.total).toBe(15);
    expect(res.body.meta.page).toBe(2);
    expect(res.body.meta.limit).toBe(5);
  });
});
