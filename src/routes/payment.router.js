const express = require("express");
const {
  createPaymentIntent,
  savePayment,
  getPaymentHistory,
} = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", createPaymentIntent);
paymentRouter.post("/payments", savePayment);
paymentRouter.get("/payments", getPaymentHistory);

module.exports = paymentRouter;
