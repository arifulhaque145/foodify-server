const { ObjectId } = require("mongodb");
const { foodifyDB } = require("../mongoClient");

const cartCollection = foodifyDB.collection("carts");

const getAllCartItemsByUserFromDB = async (userEmail) => {
  const cartItems = await cartCollection.find({ user: userEmail }).toArray({});
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

const updateItemCartToDB = async ({ itemId, quantity }) => {
  const filter = { _id: `${itemId}` };
  const options = { $set: { quantity: quantity } };
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
