const cartModel = require("../models/cart.model");
const axios = require("axios");

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

    const productResponse = await axios.get(
      `http://localhost:3001/api/products/${productId}`
    );
    const product = productResponse.data.product;

    // if (product.stock < qty) {
    //   return res.status(404).json({
    //     message: "Insufficient product quantity.",
    //   });
    // }

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
    console.log("err", err);
    
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
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

    const productResponse = await axios.get(
      `http://localhost:3001/api/products/${productId}`
    );
    const product = productResponse.data.product;

    if (product.stock < qty) {
      return res.status(404).json({
        message: `Only ${product.stock} units available in stock.`,
      });
    }

    cart.items[existingItemIndex].quantity = Number(qty);

    await cart.save();

    return res.status(200).json({
      message: "Item updated successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
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

    await cart.save();

    return res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const deleteCart = async (req, res) => {
  const user = req.user;

  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  addItemToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  deleteCart,
};
