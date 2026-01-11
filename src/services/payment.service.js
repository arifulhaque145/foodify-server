const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { foodifyDB } = require("../config/mongoClient");
const { ObjectId } = require("mongodb");

const paymentCollection = foodifyDB.collection("payments");
const orderCollection = foodifyDB.collection("orders");

const createPaymentIntentService = async (price) => {
  const amount = parseInt(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return paymentIntent.client_secret;
};

const savePaymentService = async (paymentData) => {
  const result = await paymentCollection.insertOne(paymentData);
  
  // Update order status if orderId is provided
  if (paymentData.orderId) {
    await orderCollection.updateOne(
      { _id: new ObjectId(paymentData.orderId) },
      { $set: { status: "paid", transactionId: paymentData.transactionId } }
    );
  }
  
  return result;
};

const getPaymentHistoryService = async (email) => {
  const result = await paymentCollection.find({ email: email }).toArray();
  return result;
};

module.exports = {
  createPaymentIntentService,
  savePaymentService,
  getPaymentHistoryService,
};
