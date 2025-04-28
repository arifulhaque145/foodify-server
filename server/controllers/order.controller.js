const {
  getAllOrdersFromDB,
  getOneOrderFromDB,
  updateOneOrderFromDB,
  insertOneOrderFromDB,
  deleteOneOrderFromDB,
} = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersFromDB();
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get orders", error: err.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOneOrderFromDB(orderId);
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get orders", error: err.message });
  }
};

const updateOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const order = await updateOneOrderFromDB(orderId, orderData);
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get orders", error: err.message });
  }
};

const insertOneOrder = async (req, res) => {
  const { userEmail, items, total_price, desc, img, price } = req.body;
  try {
    insertOneOrderFromDB(userEmail, items, total_price, desc, img, price);
    res.status(201).json({ message: "Order registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteOneOrder = async (req, res) => {
  try {
    const deleted = await deleteOneOrderFromDB(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.status(201).json({ message: "Order registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  updateOneOrder,
  insertOneOrder,
  deleteOneOrder,
};
