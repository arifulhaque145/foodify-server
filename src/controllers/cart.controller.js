const {
  getAllCartItemsByUserFromDB,
  addItemToCartToDB,
  removeCartItemFromDB,
  clearCartFromDB,
  updateItemCartToDB,
} = require("../services/cart.service");

const getAllCartItemsByUser = async (req, res) => {
  const userEmail = req.query.user;

  try {
    const cartItems = await getAllCartItemsByUserFromDB(userEmail);
    res.status(200).json(cartItems);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get Cart Items", error: err.message });
  }
};

const addItemToCart = async (req, res) => {
  const cartItem = req.body;

  try {
    await addItemToCartToDB(cartItem);
    res.status(201).json({ message: "Cart item added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateItemToCart = async (req, res) => {
  const itemId = req.params.id;
  const quantity = req.body.quantity;

  try {
    await updateItemCartToDB({ itemId, quantity });
    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await removeCartItemFromDB(itemId);
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Cart item not found" });
    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const result = await clearCartFromDB(req.params.id);
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Cart items not found" });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllCartItemsByUser,
  addItemToCart,
  updateItemToCart,
  removeCartItem,
  clearCart,
};
