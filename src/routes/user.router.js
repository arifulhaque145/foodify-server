const express = require("express");
const {
  createToken,
  clearToken,
  getAllUsers,
  getOneUser,
  updateOneUser,
  insertOneUser,
  deleteOneUser,
  makeUserAdmin,
  loginUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utils/helper");
const { verifyAdmin } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post("/jwt", createToken);
userRouter.post("/logout", clearToken);
userRouter.get("/users", verifyToken, verifyAdmin, getAllUsers);
userRouter.get("/users/:id", verifyToken, getOneUser);
userRouter.patch("/users/:id", verifyToken, updateOneUser);
userRouter.delete("/users/:id", verifyToken, verifyAdmin, deleteOneUser);
userRouter.post("/users/register", insertOneUser);
userRouter.patch("/users/:id/make-admin", verifyToken, verifyAdmin, makeUserAdmin);
userRouter.post("/users/login", loginUser);

module.exports = userRouter;
