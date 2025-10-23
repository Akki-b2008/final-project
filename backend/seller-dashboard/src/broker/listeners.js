const orderModel = require("../../../order/src/models/order.model");
const productModel = require("../../../product/src/models/product.model");
const paymentModel = require("../models/payment.model");
const userModel = require("../models/user.model");
const { subscribeToQueue } = require("./broker");

module.exports = async function () {
  subscribeToQueue("AUTH_SELLER_DASHBOARD.USER_CREATED", async (user) => {
    
    await userModel.updateOne(
      { _id: user._id }, 
      { $set: user }, 
      { upsert: true } 
    );
  });

  subscribeToQueue(
    "PRODUCT_SELLER_DASHBOARD.PRODUCT_CREATED",
    async (product) => {
      await productModel.updateOne(
        { _id: product._id },
        { $set: product },
        { upsert: true }
      );
    }
  );

  subscribeToQueue("ORDER_SELLER_DASHBOARD.ORDER_CREATED", async (order) => {
    await orderModel.updateOne(
      { _id: order._id },
      { $set: order },
      { upsert: true }
    );
  });

  subscribeToQueue(
    "PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED",
    async (payment) => {
      await paymentModel.updateOne(
        { order: payment.order },
        { $set: payment },
        { upsert: true }
      );
    }
  );

  subscribeToQueue(
    "PAYMENT_SELLER_DASHBOARD.UPDATED",
    async (payment) => {
      await paymentModel.findOneAndUpdate(
        { order: payment.order },
        { $set: payment }
      );
    }
  );
};
