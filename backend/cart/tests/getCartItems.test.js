const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Cart = require('../src/models/cart.model');

describe('GET /api/cart', () => {
  it('should return an empty cart when none exists for the user', async () => {
    const res = await request(app).get('/api/cart/').expect(200);

    expect(res.body).toHaveProperty('cart');
    expect(res.body.cart).toHaveProperty('user');
    expect(res.body.cart.items).toEqual([]);
    expect(res.body.totals).toEqual({ itemCount: 0, itemsQuantity: 0 });
  });

  it('should return the existing cart with items and correct totals', async () => {
    // create a cart for the mocked user id used in jest.setup.js
  const userId = new mongoose.Types.ObjectId('000000000000000000000001');

    const cart = new Cart({
      user: userId,
      items: [
        { productId: new mongoose.Types.ObjectId(), quantity: 2 },
        { productId: new mongoose.Types.ObjectId(), quantity: 3 },
      ],
    });

    await cart.save();

    const res = await request(app).get('/api/cart/').expect(200);

    expect(res.body).toHaveProperty('cart');
    expect(res.body.cart.user).toBe(userId.toString());
    expect(res.body.cart.items.length).toBe(2);
    expect(res.body.totals).toEqual({ itemCount: 2, itemsQuantity: 5 });
  });
});
