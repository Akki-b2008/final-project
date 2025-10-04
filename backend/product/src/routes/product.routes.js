const express = require("express");
const createAuthMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");
const router = express.Router();
const multer = require("multer");
const {
  createProductValidators,
} = require("../validators/validation.middleware");

const upload = multer({ storage: multer.memoryStorage() });

//createProducts  POST /api/products
router.post(
  "/",
  createAuthMiddleware(["seller"]),
  upload.array("images", 5),
  createProductValidators,
  productController.createProducts
);

// getProducts  GET /api/products
router.get("/", productController.getProducts);

//updateProduct PATCH /api/products/:id
router.patch(
  "/:id",
  createAuthMiddleware(["seller"]),
  upload.array("images", 5),
  productController.updateProduct
);

//deleteProduct  DELETE /api/products/:id
router.delete(
  "/:id",
  createAuthMiddleware(["seller"]),
  productController.deleteProduct
);

//getSellerProducts GET /api/products/seller
router.get(
  "/seller",
  createAuthMiddleware(["seller"]),
  productController.getProductsBySeller
);

//getProductsById GET /api/products/:id
router.get("/:id", productController.getProductsById);

module.exports = router;
