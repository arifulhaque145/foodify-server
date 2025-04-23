const express = require("express");
const {
  getAllUsers,
  insertOneUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/register", insertOneUser);

module.exports = userRouter;
