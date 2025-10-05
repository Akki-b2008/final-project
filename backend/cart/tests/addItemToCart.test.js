const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Cart = require('../src/models/cart.model');

describe('POST /api/cart/items', () => {
  it('should create a cart and add an item when none exists', async () => {
    const productId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post('/api/cart/items')
      .send({ productId: productId.toString(), qty: 2 })
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Item added to cart');
    expect(res.body.cart).toHaveProperty('items');
    expect(res.body.cart.items.length).toBe(1);
    expect(res.body.cart.items[0].productId).toBe(productId.toString());
    expect(res.body.cart.items[0].quantity).toBe(2);
  });

  it('should increment quantity when the same product is added again', async () => {
    const productId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');

    // create an initial cart with quantity 1
    const cart = new Cart({
      user: userId,
      items: [{ productId, quantity: 1 }],
    });
    await cart.save();

    const res = await request(app)
      .post('/api/cart/items')
      .send({ productId: productId.toString(), qty: 3 })
      .expect(200);

    expect(res.body.message).toBe('Item added to cart');
    expect(res.body.cart.items.length).toBe(1);
    expect(res.body.cart.items[0].productId).toBe(productId.toString());
    expect(res.body.cart.items[0].quantity).toBe(4);
  });

  it('should add a new item when a different product is posted', async () => {
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');
    const product1 = new mongoose.Types.ObjectId();
    const product2 = new mongoose.Types.ObjectId();

    const cart = new Cart({
      user: userId,
      items: [{ productId: product1, quantity: 2 }],
    });
    await cart.save();

    const res = await request(app)
      .post('/api/cart/items')
      .send({ productId: product2.toString(), qty: 5 })
      .expect(200);

    expect(res.body.cart.items.length).toBe(2);
    const found = res.body.cart.items.find((i) => i.productId === product2.toString());
    expect(found).toBeDefined();
    expect(found.quantity).toBe(5);
  });
});
