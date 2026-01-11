const express = require("express");
const {
  getAllOrders,
  getOneOrder,
  updateOneOrder,
  insertOneOrder,
  deleteOneOrder,
} = require("../controllers/order.controller");
const { verifyToken } = require("../utils/helper");

const orderRouter = express.Router();

orderRouter.get("/orders", verifyToken, getAllOrders);
orderRouter.get("/orders/:id", verifyToken, getOneOrder);
orderRouter.patch("/orders/:id", verifyToken, updateOneOrder);
orderRouter.delete("/orders/:id", verifyToken, deleteOneOrder);
orderRouter.post("/orders", verifyToken, insertOneOrder);

module.exports = orderRouter;
