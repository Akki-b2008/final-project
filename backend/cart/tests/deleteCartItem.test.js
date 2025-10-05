const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Cart = require('../src/models/cart.model');

describe('DELETE /api/cart/items/:id', () => {
  it('should remove an existing item from the cart', async () => {
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');
    const productId = new mongoose.Types.ObjectId();

    const cart = new Cart({
      user: userId,
      items: [
        { productId, quantity: 2 },
        { productId: new mongoose.Types.ObjectId(), quantity: 1 },
      ],
    });
    await cart.save();

    const res = await request(app)
      .delete(`/api/cart/items/${productId.toString()}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Item removed successfully');
    expect(res.body.cart.items.find(i => i.productId === productId.toString())).toBeUndefined();
  });

  it('should return 404 when no cart exists for the user', async () => {
    // ensure no cart exists for mocked user
    await Cart.deleteMany({ user: new mongoose.Types.ObjectId('000000000000000000000001') });

    const productId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/cart/items/${productId.toString()}`)
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Cart not found');
  });

  it('should return 404 when the item is not present in the cart', async () => {
    const userId = new mongoose.Types.ObjectId('000000000000000000000001');
    const existingProduct = new mongoose.Types.ObjectId();
    const missingProduct = new mongoose.Types.ObjectId();

    const cart = new Cart({
      user: userId,
      items: [{ productId: existingProduct, quantity: 2 }],
    });
    await cart.save();

    const res = await request(app)
      .delete(`/api/cart/items/${missingProduct.toString()}`)
      .expect(404);

    expect(res.body).toHaveProperty('message', 'Item not found');
  });
});
