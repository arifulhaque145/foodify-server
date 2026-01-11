const {
  getOwnerStatsFromDB,
  getOwnerOrdersFromDB,
  updateOrderStatusByOwnerInDB
} = require("../services/owner.service");

const getOwnerDashboardStats = async (req, res) => {
  const email = req.user.email;
  try {
    const stats = await getOwnerStatsFromDB(email);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: "Failed to get dashboard stats", error: err.message });
  }
};

const getOwnerOrders = async (req, res) => {
  const email = req.user.email;
  try {
    const orders = await getOwnerOrdersFromDB(email);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const result = await updateOrderStatusByOwnerInDB(orderId, status);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Order not found or status already set" });
    }
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status", error: err.message });
  }
};

module.exports = {
  getOwnerDashboardStats,
  getOwnerOrders,
  updateOrderStatus
};
