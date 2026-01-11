const express = require("express");
const {
  getAllFoods,
  getOneFood,
  updateOneFood,
  deleteOneFood,
  insertOneFood,
} = require("../controllers/food.controller");
const upload = require("../utils/upload");
const { verifyToken } = require("../utils/helper");
const { verifyOwner } = require("../middlewares/auth.middleware");

const foodRouter = express.Router();

foodRouter.get("/food-items", getAllFoods);
foodRouter.get("/food-items/:id", getOneFood);
foodRouter.patch("/food-items/:id", verifyToken, verifyOwner, updateOneFood);
foodRouter.delete("/food-items/:id", verifyToken, verifyOwner, deleteOneFood);
foodRouter.post("/food-items", verifyToken, verifyOwner, upload.single("image"), insertOneFood);

module.exports = foodRouter;
