const { foodifyDB } = require("../mongoClient");
const { ObjectId } = require("mongodb");

const foodCollection = foodifyDB.collection("food-items");

const getAllFoodsFromDB = async () => {
  const foods = await foodCollection.find({}).toArray();
  return foods;
};

const getOneFoodFromDB = async (foodId) => {
  const query = { _id: new ObjectId(foodId) };
  const food = await foodCollection.findOne(query);
  return food;
};

const updateOneFoodFromDB = async (foodId, foodData) => {
  const filter = { _id: new ObjectId(foodId) };
  const updateDoc = {
    $set: {
      foodData,
    },
  };
  const updatedfood = await foodCollection.updateOne(filter, updateDoc);
  return updatedfood;
};

const insertOneFoodFromDB = async (item, catagory, desc, image, price) => {
  const foodExists = await foodCollection.findOne({ email });
  if (foodExists) return res.status(400).json({ msg: "Food already exists" });

  const newFood = {
    item,
    catagory,
    desc,
    image,
    price,
    createdAt: new Date(),
  };
  await foodCollection.insertOne(newFood);
};

const deleteOneFoodFromDB = async (id) => {
  const result = await foodCollection.deleteOne({ _id: new ObjectId(id) });
  return result;
};

module.exports = {
  getAllFoodsFromDB,
  getOneFoodFromDB,
  updateOneFoodFromDB,
  insertOneFoodFromDB,
  deleteOneFoodFromDB,
};
