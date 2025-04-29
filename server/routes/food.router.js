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
foodRouter.get("/review-items/:id", getOneFood);
foodRouter.patch("/review-items/:id", updateOneFood);
foodRouter.delete("/review-items/:id", deleteOneFood);
foodRouter.post("/review-items/:id", insertOneFood);

module.exports = foodRouter;
