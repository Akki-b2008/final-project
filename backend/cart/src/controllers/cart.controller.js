const cartModel = require("../models/cart.model");

const getCartItems = async (req, res) => {
  const user = req.user;

  let cart = await cartModel.findOne({
    user: user.id,
  });

  if (!cart) {
    cart = new cartModel({
      user: user.id,
      items: [],
    });
  }

  res.status(200).json({
    cart,
    totals: {
      itemCount: cart.items.length,
      itemsQuantity: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    },
  });
};

const addItemToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const user = req.user;

    let cart = await cartModel.findOne({ user: user.id });

    if (!cart) {
      cart = new cartModel({
        user: user.id,
        items: [],
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += Number(qty);
    } else {
      cart.items.push({ productId, quantity: qty });
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart",
      cart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const user = req.user;

    const productId = req.params.id;

    const { qty } = req.body;

    const cart = await cartModel.findOne({
      user: user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex < 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    cart.items[existingItemIndex].quantity = Number(qty);

    await cart.save();

    return res.status(200).json({
      message: "Item updated successfully",
      cart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const user = req.user;

    const productId = req.params.id;

    let cart = await cartModel.findOne({
      user: user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex < 0) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    cart.items.splice(existingItemIndex, 1);

    // cart.items = cart.items.filter(
    //   (item) => item.productId.toString() !== productId
    // );

    await cart.save();

    return res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteCart = async (req, res) => {
  const user = req.user;

  const cart = await cartModel.findOneAndUpdate(
    { user: user.id },
    { $set: { items: [] } },
    { new: true, runValidators: true }
  );

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  return res.status(200).json({
    message: "Cart cleared successfully",
    cart,
  });
};

module.exports = {
  addItemToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  deleteCart,
};
