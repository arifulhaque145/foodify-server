const express = require("express");
const {
  getAllOrders,
  getOneOrder,
  updateOneOrder,
  deleteOneOrder,
  insertOneOrder,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.get("/order-items", getAllOrders);
orderRouter.get("/order-items/:id", getOneOrder);
orderRouter.patch("/order-items/:id", updateOneOrder);
orderRouter.delete("/order-items/:id", deleteOneOrder);
orderRouter.post("/order-items/:id", insertOneOrder);

module.exports = orderRouter;
