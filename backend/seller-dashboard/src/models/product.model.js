const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  img: [
    {
      url: String,
      thumbnail: String,
      fileId: String,
    },
  ],
  stock: {
    type: Number,
    default: 0,
  },
});

productSchema.index({ title: "text", description: "text" });

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
