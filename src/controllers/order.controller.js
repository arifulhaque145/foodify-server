const {
  getAllOrdersFromDB,
  getOneOrderFromDB,
  updateOneOrderFromDB,
  deleteOneOrderFromDB,
  insertOneOrderFromDB,
} = require("../services/order.service");

const getAllOrders = async (req, res) => {
  const email = req.query.user;

  try {
    const orders = await getAllOrdersFromDB(email);
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
      .json({ message: "Failed to update order", error: err.message });
  }
};

const insertOneOrder = async (req, res) => {
  const orderItem = req.body;

  try {
    await insertOneOrderFromDB(orderItem);
    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteOneOrder = async (req, res) => {
  try {
    const result = await deleteOneOrderFromDB(req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
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
