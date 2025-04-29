const express = require("express");
const {
  getAllCartItemsByUser,
  addItemToCart,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/cart-items", getAllCartItemsByUser);
cartRouter.post("/cart-items/:id", addItemToCart);
cartRouter.delete("/cart-items/:id", removeCartItem);
cartRouter.delete("/cart-items-all/:id", clearCart);

module.exports = cartRouter;
