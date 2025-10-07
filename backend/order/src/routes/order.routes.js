const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const validation = require("../middlewares/validations/validation.middleware");

router.post(
  "/",
  createAuthMiddleware(["user"]),
  validation.createOrderValidation,
  orderController.createOrder
);

router.get("/me", createAuthMiddleware(["user"]), orderController.getMyOrders);

router.post(
  "/:id/cancel",
  createAuthMiddleware(["user"]),
  orderController.cancelOrderById
);

router.patch(
  "/:id/address",
  createAuthMiddleware(["user"]),
  validation.updateAddressValidation,
  orderController.updateOrderAddress
);

router.get(
  "/:id",
  createAuthMiddleware(["user", "admin"]),
  orderController.getOrderById
);

module.exports = router;
