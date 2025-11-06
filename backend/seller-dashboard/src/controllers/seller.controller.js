const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

async function getMetrics(req, res) {
  try {
    const seller = req.user;

    const products = await productModel.find({ seller: seller.id });

    const productIds = products.map((p) => String(p._id));

    const orders = await orderModel.find({
      "items.product": { $in: productIds },
      status: { $in: ["CONFIRMED", "SHIPPED", "DELIVERED"] },
    });

    let sales = 0;
    let revenue = 0;
    const productSales = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (productIds.includes(String(item.product))) {
          sales += item.quantity;
          revenue += item.price.amount * item.quantity;
          productSales[item.product] =
            (productSales[item.product] || 0) + item.quantity;
        }
      });
    });

    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, qty]) => {
        const prod = products.find((p) => p._id.equals(productId));
        return prod ? { id: prod._id, title: prod.title, sold: qty } : null;
      })
      .filter(Boolean);

    return res.json({
      sales,
      revenue,
      topProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getOrders(req, res) {
  try {
    const seller = req.user;

    const products = await productModel
      .find({ seller: seller.id })
      .select("_id");

    if (!products.length) {
      return res.status(200).json([]);
    }

    const productIds = products.map((p) => p._id);

    const orders = await orderModel
      .find({
        "items.product": { $in: productIds },
      })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    const filteredOrders = orders
      .map((order) => {
        const filteredItems = order.items.filter((item) =>
          productIds
            .map((id) => id.toString())
            .includes(item.product.toString())
        );
        return { ...order.toObject(), items: filteredItems };
      })
      .filter((order) => order.items.length > 0);

    return res.status(200).json(filteredOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      Error: error.message || error,
    });
  }
}

async function getProducts(req, res) {
  try {
    const seller = req.user;

    const products = await productModel
      .find({ seller: seller.id })
      .sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getMetrics,
  getOrders,
  getProducts,
};
