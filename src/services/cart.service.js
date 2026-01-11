const { ObjectId } = require("mongodb");
const { foodifyDB } = require("../config/mongoClient");

const cartCollection = foodifyDB.collection("carts");

const getAllCartItemsByUserFromDB = async (userEmail) => {
  const cartItems = await cartCollection.find({ user: userEmail }).toArray({});
  return cartItems;
};

const addItemToCartToDB = async (cartItem) => {
  const { _id, stock, ...rest } = cartItem;
  const existing = await cartCollection.findOne({ menuId: _id });

  let result;

  if (!existing) {
    const newCartItem = {
      menuId: _id,
      quantity: 1,
      stock: stock,
      ...rest,
      addedAt: new Date(),
    };

    result = await cartCollection.insertOne(newCartItem);
  } else {
    result = await cartCollection.updateOne(
      { menuId: _id },
      {
        $inc: { quantity: 1, stock: -1 },
        $set: { updatedAt: new Date() },
      }
    );
  }

  return result;
};

const updateItemCartToDB = async ({ itemId, quantity }) => {
  const result = await cartCollection.updateOne(
    { _id: new ObjectId(itemId) },
    { $set: { quantity } }
  );
  return result;
};

const removeCartItemFromDB = async (itemId) => {
  console.log(itemId);

  const result = await cartCollection.deleteOne({
    _id: new ObjectId(itemId),
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
