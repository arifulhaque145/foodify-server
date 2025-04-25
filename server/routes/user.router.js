const express = require("express");
const {
  getAllUsers,
  getOneUser,
  updateOneUser,
  insertOneUser,
  deleteOneUser,
  makeUserAdmin,
  loginUser,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getOneUser);
userRouter.patch("/users/:id", updateOneUser);
userRouter.delete("/users/:id", deleteOneUser);
userRouter.post("/users/register", insertOneUser);
userRouter.patch("/users/:id/make-admin", makeUserAdmin);
userRouter.post("/users/login", loginUser);

module.exports = userRouter;
