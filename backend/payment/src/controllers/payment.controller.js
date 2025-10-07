const paymentModel = require("../models/payment.model");
const axios = require("axios");
const razorpay = require("../services/razorpay.service");

const createPayment = async (req, res) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  try {
    const orderId = req.params.orderId;

    const orderResponse = await axios.get(
      `http://localhost:3003/api/order/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const price = orderResponse.data.order.totalPrice;

    const order = await razorpay.orders.create(price);
    const payment = await paymentModel.create({
      order: orderId,
      razorpayOrderId: order.id,
      user: req.user.id,
      price: {
        amount: order.amount,
        currency: order.currency,
      },
    });

    console.log(payment);
    

    return res.status(201).json({
      message: "Payment initiated",
      payment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message || err,
    });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpayOrderId, paymentId, signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  try {
    const {
      validatePaymentVerification,
    } = require("../../node_modules/razorpay/dist/utils/razorpay-utils.js");

    const isValid = validatePaymentVerification(
      {
        order_id: razorpayOrderId,
        payment_id: paymentId,
      }[(signature, secret)]
    );

    console.log(isValid);

    if (!isValid) {
      return res.status(400).json({
        message: "invalid signature",
      });
    }

    const payment = await paymentModel.findOne({
      razorpayOrderId,
      status: "PENDING",
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    (payment.paymentId = paymentId),
      (payment.signature = signature),
      (payment.status = "SUCCESS");

    await payment.save();

    return res.status(200).json({
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message || error,
    });
  }
};

module.exports = { createPayment, verifyPayment };
