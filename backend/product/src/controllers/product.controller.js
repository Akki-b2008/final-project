const { mongoose } = require("mongoose");
const productModel = require("../models/product.model");
const uploadImage = require("../services/imageKit.service");

const createProducts = async (req, res) => {
  try {
    const { title, description, priceAmount, priceCurrency = "INR" } = req.body;
    const seller = req.user.id;

    const price = {
      amount: Number(priceAmount),
      currency: priceCurrency.toUpperCase(),
    };

    const images = await Promise.all(
      (req.files || []).map((file) => uploadImage(file.buffer))
    );

    const product = await productModel.create({
      title,
      description,
      price,
      seller,
      img: images,
    });

    return res.status(201).json({
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

const getProducts = async (req, res) => {
  const { q, minprice, maxprice, skip = 0, limit = 20 } = req.query;

  const filter = {};

  if (q) {
    filter.$text = { $search: q };
  }

  if (minprice) {
    filter["price.amount"] = {
      ...filter["price.amount"],
      $gte: Number(minprice),
    };
  }

  if (maxprice) {
    filter["price.amount"] = {
      ...filter["price.amount"],
      $lte: Number(maxprice),
    };
  }

  const products = await productModel
    .find(filter)
    .skip(Number(skip))
    .limit(Math.min(Number(limit), 20));

  return res.status(200).json({
    message: "Products fetched successfully",
    data: products,
  });
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json({
    message: "Product fetched successfully",
    product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const product = await productModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (product.seller.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden: You can only update your own products",
    });
  }

  const allowedUpdates = ["title", "description", "price"];

  for (const key of object.key(req.body)) {
    if (allowedUpdates.includes(key)) {
      if (key === "price" && typeof req.body.price === "object") {
        if (req.body.price.amount !== undefined) {
          product.price.amount = Number(req.body.amount.price);
        }

        if (req.body.price.currency !== undefined) {
          product.price.currency = req.body.price.currency;
        }
      } else {
        product[key] = req.body[key];
      }
    }
  }

  await product.save();

  return res.status(200).json({
    message: "Product updated successfully",
    product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const product = await productModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (product.seller.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden : You can only delete your products",
    });
  }

  await productModel.findOneAndDelete({ _id: id });

  return res.status(200).json({
    message: "Product deleted successfully",
  });
};

async function getProductsBySeller(req, res) {
  const seller = req.user;

  const { skip = 0, limit = 20 } = req.query;

  const products = await productModel
    .find({ seller: seller.id })
    .skip(Number(skip))
    .limit(Math.min(Number(limit), 20));

  return res.status(200).json({ data: products });
}

module.exports = {
  createProducts,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  getProductsBySeller,
};
