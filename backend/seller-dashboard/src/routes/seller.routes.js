const express = require("express");
const router = express.Router();
const createAuthMiddleware = require("../middlewares/auth.middleware");
const sellerController = require("../controllers/seller.controller");

router.get(
  "/metrics",
  createAuthMiddleware(["seller"]),
  sellerController.getMetrics
);

router.get(
  "/orders",
  createAuthMiddleware(["seller"]),
  sellerController.getOrders
);

router.get(
  "/products",
  createAuthMiddleware(["seller"]),
  sellerController.getProducts
);

module.exports = router;
