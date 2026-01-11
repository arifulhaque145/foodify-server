const { foodifyDB } = require("../config/mongoClient");
const { ObjectId } = require("mongodb");

const orderCollection = foodifyDB.collection("orders");

const getAllOrdersFromDB = async (userEmail) => {
  const orders = await orderCollection.find({ user: userEmail }).toArray();
  return orders;
};

const getOneOrderFromDB = async (orderId) => {
  const query = { _id: new ObjectId(orderId) };
  const order = await orderCollection.findOne(query);
  return order;
};

const updateOneOrderFromDB = async (orderId, orderData) => {
  const filter = { _id: new ObjectId(orderId) };
  const updateDoc = {
    $set: orderData,
  };
  const updatedOrder = await orderCollection.updateOne(filter, updateDoc);
  return updatedOrder;
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
