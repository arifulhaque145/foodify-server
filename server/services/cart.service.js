const { foodifyDB } = require("../mongoClient");
const { ObjectId } = require("mongodb");

const cartCollection = foodifyDB.collection("cart-items");

const getAllCartItemsByUserFromDB = async (userEmail) => {
  const cartItems = await cartCollection.find({ email: userEmail }).toArray();
  return cartItems;
};

const addItemToCartToDB = async (userId, foodItemId, quantity) => {
  const cartItem = {
    userId: new ObjectId(userId),
    foodItemId: new ObjectId(foodItemId),
    quantity,
    addedAt: new Date(),
  };
  const result = await cartCollection.insertOne(cartItem);
  return result;
};

const removeCartItemFromDB = async (id) => {
  const result = await cartCollection.deleteOne({
    _id: new ObjectId(id),
  });
  return result;
};

const clearCartFromDB = async (userId) => {
  const result = await cartCollection.deleteMany({
    userId: new ObjectId(userId),
  });
  return result;
};

module.exports = {
  getAllCartItemsByUserFromDB,
  addItemToCartToDB,
  removeCartItemFromDB,
  clearCartFromDB,
};
