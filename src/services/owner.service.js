const { foodifyDB } = require("../config/mongoClient");
const { ObjectId } = require("mongodb");

const foodCollection = foodifyDB.collection("food-items");
const orderCollection = foodifyDB.collection("orders");

const getOwnerStatsFromDB = async (ownerEmail) => {
  // Logic assumes food items have an 'ownerEmail' field to identify which restaurant they belong to
  const totalFoods = await foodCollection.countDocuments({ ownerEmail });
  
  const orders = await orderCollection.find({ "items.ownerEmail": ownerEmail }).toArray();
  
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => {
    // Calculate revenue only for items belonging to this owner
    const ownerItems = order.items.filter(item => item.ownerEmail === ownerEmail);
    const orderRevenue = ownerItems.reduce((s, item) => s + (item.price * (item.quantity || 1)), 0);
    return sum + orderRevenue;
  }, 0);

  return {
    totalFoods,
    totalOrders,
    totalRevenue
  };
};

const getOwnerOrdersFromDB = async (ownerEmail) => {
  // Find orders that contain items from this restaurant owner
  const orders = await orderCollection.find({ "items.ownerEmail": ownerEmail }).toArray();
  return orders;
};

const updateOrderStatusByOwnerInDB = async (orderId, status) => {
  const result = await orderCollection.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { status: status, updatedAt: new Date() } }
  );
  return result;
};

module.exports = {
  getOwnerStatsFromDB,
  getOwnerOrdersFromDB,
  updateOrderStatusByOwnerInDB
};
