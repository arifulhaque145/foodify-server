const bcrypt = require("bcrypt");
const { foodifyDB } = require("../mongoClient");
const { ObjectId } = require("mongodb");

const orderCollection = foodifyDB.collection("orders");

const getAllOrdersFromDB = async (userEmail) => {
  const foods = await orderCollection.find({ user: userEmail }).toArray();
  return foods;
};

const getOneOrderFromDB = async (orderId) => {
  const query = { _id: new ObjectId(orderId) };
  const order = await orderCollection.find(query).toArray();
  return order;
};

const updateOneOrderFromDB = async (foodId, foodData) => {
  const filter = { _id: new ObjectId(foodId) };
  const updateDoc = {
    $set: {
      foodData,
    },
  };
  const updatedfood = await orderCollection.updateOne(filter, updateDoc);
  return updatedfood;
};

const insertOneOrderFromDB = async (order) => {
  const result = await orderCollection.insertOne(order);
  return result;
};

const deleteOneOrderFromDB = async (orderId) => {
  const result = await orderCollection.deleteOne({
    _id: new ObjectId(orderId),
  });
  return result;
};

module.exports = {
  getAllOrdersFromDB,
  getOneOrderFromDB,
  updateOneOrderFromDB,
  insertOneOrderFromDB,
  deleteOneOrderFromDB,
};
