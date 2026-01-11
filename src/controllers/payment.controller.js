const {
  createPaymentIntentService,
  savePaymentService,
  getPaymentHistoryService,
} = require("../services/payment.service");

const createPaymentIntent = async (req, res) => {
  const { price } = req.body;
  try {
    if (!price || price <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }
    const clientSecret = await createPaymentIntentService(price);
    res.status(200).json({ clientSecret });
  } catch (err) {
    res.status(500).json({ message: "Failed to create payment intent", error: err.message });
  }
};

const savePayment = async (req, res) => {
  const paymentData = req.body;
  try {
    const result = await savePaymentService(paymentData);
    res.status(201).json({ message: "Payment saved successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Failed to save payment", error: err.message });
  }
};

const getPaymentHistory = async (req, res) => {
  const email = req.query.email;
  try {
    const history = await getPaymentHistoryService(email);
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to get payment history", error: err.message });
  }
};

module.exports = {
  createPaymentIntent,
  savePayment,
  getPaymentHistory,
};
