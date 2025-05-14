const express = require("express");
const {
  getAllOrders,
  getOneOrder,
  deleteOneOrder,
  insertOneOrder,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.get("/order-items", getAllOrders);
orderRouter.get("/order-items/:id", getOneOrder);
orderRouter.post("/order-items", insertOneOrder);
orderRouter.delete("/order-items/:id", deleteOneOrder);

module.exports = orderRouter;
