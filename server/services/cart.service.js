const { foodifyDB } = require("../mongoClient");

const cartCollection = foodifyDB.collection("cart-items");

const getAllCartItemsByUserFromDB = async (userEmail) => {
  const cartItems = await cartCollection.find({ user: userEmail }).toArray();
  return cartItems;
};

const addItemToCartToDB = async (cartItem) => {
  const newCartItem = {
    ...cartItem,
    addedAt: new Date(),
  };
  const result = await cartCollection.insertOne(newCartItem);
  return result;
};

const updateItemCartToDB = async (updateData) => {
  const filter = { _id: `${updateData.id}`, user: updateData.user };
  const options = { $set: { quantity: updateData.quantity } };
  const result = await cartCollection.updateOne(filter, options);
  return result;
};

const removeCartItemFromDB = async (itemId) => {
  const result = await cartCollection.deleteOne({
    _id: `${itemId}`,
  });
  return result;
};

const clearCartFromDB = async (userId) => {
  const result = await cartCollection.deleteMany({
    user: userId,
  });
  return result;
};

module.exports = {
  getAllCartItemsByUserFromDB,
  addItemToCartToDB,
  updateItemCartToDB,
  removeCartItemFromDB,
  clearCartFromDB,
};
