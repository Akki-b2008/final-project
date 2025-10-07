const request = require('supertest');
const { initTestEnv, clearDatabase, closeTestEnv, createToken, axios } = require('./testSetup');

let app;
let OrderModel;

describe('POST /api/order', () => {
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

  test('creates an order successfully when cart and products exist', async () => {
    // mock cart service: one item
    axios.get
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          cart: {
            items: [
              { productId: '507f1f77bcf86cd799439011', quantity: 2 }
            ]
          }
        }
      }))
      // mock product service for the product
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          product: {
            _id: '507f1f77bcf86cd799439011',
            title: 'Test Product',
            stock: 10,
            price: { amount: 100, currency: 'INR' }
          }
        }
      }));

    // sign a token with user id and role
    const token = createToken();

    const payload = {
      shippingAddress: {
        street: '123 Test St',
        city: 'Testville',
        state: 'TS',
        pincode: '12345',
        country: 'Testland'
      }
    };

    const res = await request(app)
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(201);

    expect(res.body).toHaveProperty('message', 'Order created successfully');
    expect(res.body).toHaveProperty('order');

    const ordersInDb = await OrderModel.find();
    expect(ordersInDb.length).toBe(1);
    const order = ordersInDb[0].toObject();
    expect(order.totalPrice.amount).toBe(200); // 2 * 100
    expect(order.items[0].quantity).toBe(2);
  });

  test('returns validation error when shipping address missing', async () => {
    const token = createToken();

    const res = await request(app)
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400);

    expect(res.body).toHaveProperty('errors');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  test('returns 500 when product stock insufficient', async () => {
    // mock cart service: one item
    axios.get
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          cart: {
            items: [
              { productId: '507f1f77bcf86cd799439022', quantity: 5 }
            ]
          }
        }
      }))
      // mock product service with low stock
      .mockImplementationOnce(() => Promise.resolve({
        data: {
          product: {
            _id: '507f1f77bcf86cd799439022',
            title: 'Low Stock Product',
            stock: 1,
            price: { amount: 50, currency: 'INR' }
          }
        }
      }));

    const token = createToken();

    const payload = {
      shippingAddress: {
        street: '123 Test St',
        city: 'Testville',
        state: 'TS',
        pincode: '12345',
        country: 'Testland'
      }
    };

    const res = await request(app)
      .post('/api/order')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect(500);

    expect(res.body).toHaveProperty('message', 'Internal server error');
    expect(res.body).toHaveProperty('error');
  });
});
