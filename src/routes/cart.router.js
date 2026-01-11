const express = require("express");
const {
  getAllCartItemsByUser,
  addItemToCart,
  removeCartItem,
  clearCart,
  updateItemToCart,
} = require("../controllers/cart.controller");
const { verifyToken } = require("../utils/helper");

const cartRouter = express.Router();

cartRouter.get("/cart", verifyToken, getAllCartItemsByUser);
cartRouter.post("/cart", verifyToken, addItemToCart);
cartRouter.patch("/cart/:id", verifyToken, updateItemToCart);
cartRouter.delete("/cart/:id", verifyToken, removeCartItem);
cartRouter.delete("/clear-cart/:id", verifyToken, clearCart);

module.exports = cartRouter;
