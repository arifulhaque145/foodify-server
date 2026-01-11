const {
  getAllFoodsFromDB,
  getOneFoodFromDB,
  updateOneFoodFromDB,
  insertOneFoodFromDB,
  deleteOneFoodFromDB,
} = require("../services/food.service");

const getAllFoods = async (req, res) => {
  try {
    const foods = await getAllFoodsFromDB();
    res.status(200).json(foods);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get Foods", error: err.message });
  }
};

const getOneFood = async (req, res) => {
  const foodId = req.params.id;

  try {
    const food = await getOneFoodFromDB(foodId);
    res.status(200).json(food);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get foods", error: err.message });
  }
};

const updateOneFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const foodData = req.body;
    const food = await updateOneFoodFromDB(foodId, foodData);
    res.status(200).json(food);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update food", error: err.message });
  }
};

const insertOneFood = async (req, res) => {
  const { item, catagory, desc, price } = req.body;
  const ownerEmail = req.user.email;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    await insertOneFoodFromDB(item, catagory, desc, image, price, ownerEmail);
    res.status(201).json({ message: "Food registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteOneFood = async (req, res) => {
  try {
    const result = await deleteOneFoodFromDB(req.params.id);
    if (result.deletedCount === 0) return res.status(404).json({ message: "Food not found" });
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllFoods,
  getOneFood,
  updateOneFood,
  insertOneFood,
  deleteOneFood,
};
