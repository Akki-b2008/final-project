const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Cart = require('../src/models/cart.model');

describe('DELETE /api/cart/', () => {
  it('should clear the cart items when a cart exists', async () => {
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');

    const cart = new Cart({
      user: userId,
      items: [
        { productId: new mongoose.Types.ObjectId(), quantity: 2 },
        { productId: new mongoose.Types.ObjectId(), quantity: 1 },
      ],
    });
    await cart.save();

    const res = await request(app).delete('/api/cart/').expect(200);

    expect(res.body).toHaveProperty('message', 'Cart cleared successfully');
    expect(res.body.cart).toBeDefined();
    expect(res.body.cart.items).toEqual([]);
  });

  it('should return 404 when no cart exists for the user', async () => {
    // ensure no cart exists for mocked user
    await Cart.deleteMany({ user: new mongoose.Types.ObjectId('000000000000000000000001') });

    const res = await request(app).delete('/api/cart/').expect(404);

    expect(res.body).toHaveProperty('message', 'Cart not found');
  });
});
