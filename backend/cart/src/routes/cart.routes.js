const express = require("express");
const router = express.Router();
const createAuthMiddleware = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");
const {
  validateAddItemToCart,
  validateUpdateCartItem,
} = require("../validators/cart.validators");

router.get("/", createAuthMiddleware(["user"]), cartController.getCartItems);

router.post(
  "/items",
  validateAddItemToCart,
  createAuthMiddleware(["user"]),
  cartController.addItemToCart
);

router.patch(
  "/items/:id",
  validateUpdateCartItem,
  createAuthMiddleware(["user"]),
  cartController.updateCartItem
);

router.delete("/", createAuthMiddleware(["user"]), cartController.deleteCart);

router.delete(
  "/items/:id",
  createAuthMiddleware(["user"]),
  cartController.deleteCartItem
);

module.exports = router;
