const express = require("express");
const {
  getOwnerDashboardStats,
  getOwnerOrders,
  updateOrderStatus
} = require("../controllers/owner.controller");
const { verifyToken } = require("../utils/helper");
const { verifyOwner } = require("../middlewares/auth.middleware");

const ownerRouter = express.Router();

// All owner routes are protected by verifyToken and verifyOwner
ownerRouter.use(verifyToken, verifyOwner);

ownerRouter.get("/owner/stats", getOwnerDashboardStats);
ownerRouter.get("/owner/orders", getOwnerOrders);
ownerRouter.patch("/owner/order-status/:orderId", updateOrderStatus);

module.exports = ownerRouter;
