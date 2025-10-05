const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Cart = require('../src/models/cart.model');

describe('PATCH /api/cart/items/:id', () => {
  it('should update an existing item quantity', async () => {
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');
    const productId = new mongoose.Types.ObjectId();

    const cart = new Cart({
      user: userId,
      items: [{ productId, quantity: 2 }],
    });
    await cart.save();

    const res = await request(app)
      .patch(`/api/cart/items/${productId.toString()}`)
      .send({ qty: 7 })
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Item updated successfully');
    expect(res.body.cart.items.length).toBe(1);
    expect(res.body.cart.items[0].productId).toBe(productId.toString());
    expect(res.body.cart.items[0].quantity).toBe(7);
  });

  it('should return 404 when no cart exists for the user', async () => {
    // ensure no cart exists for the mocked user
  await Cart.deleteMany({ user: new mongoose.Types.ObjectId('000000000000000000000001') });

    const randomProduct = new mongoose.Types.ObjectId();

    const res = await request(app)
      .patch(`/api/cart/items/${randomProduct.toString()}`)
      .send({ qty: 1 })
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Cart not found');
  });

  it('should return 404 when the item is not found in the cart', async () => {
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');
    const existingProduct = new mongoose.Types.ObjectId();
    const missingProduct = new mongoose.Types.ObjectId();

    const cart = new Cart({
      user: userId,
      items: [{ productId: existingProduct, quantity: 2 }],
    });
    await cart.save();

    const res = await request(app)
      .patch(`/api/cart/items/${missingProduct.toString()}`)
      .send({ qty: 10 })
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Item not found');
  });
});
