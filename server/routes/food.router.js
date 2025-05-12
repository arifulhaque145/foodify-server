const express = require("express");
const {
  getAllFoods,
  getOneFood,
  updateOneFood,
  deleteOneFood,
  insertOneFood,
} = require("../controllers/food.controller");

const foodRouter = express.Router();

foodRouter.get("/food-items", getAllFoods);
foodRouter.get("/food-items/:id", getOneFood);
foodRouter.patch("/food-items/:id", updateOneFood);
foodRouter.delete("/food-items/:id", deleteOneFood);
foodRouter.post("/food-items/:id", insertOneFood);

module.exports = foodRouter;
