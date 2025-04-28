const express = require("express");
const {
  getAllCartItemsByUser,
  addItemToCart,
  removeCartItem,
  clearCart,
} = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.get("/cart-items", getAllCartItemsByUser);
cartRouter.post("/food-items/:id", addItemToCart);
cartRouter.delete("/food-items/:id", removeCartItem);
cartRouter.delete("/food-items-all/:id", clearCart);

module.exports = cartRouter;
