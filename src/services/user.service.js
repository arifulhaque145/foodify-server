const bcrypt = require("bcrypt");
const { foodifyDB } = require("../config/mongoClient");
const { ObjectId } = require("mongodb");

const userCollection = foodifyDB.collection("users");

const getAllUsersFromDB = async () => {
  const users = await userCollection.find({}).toArray();
  return users;
};

const getOneUserFromDB = async (userId) => {
  const query = { _id: new ObjectId(userId) };
  const user = await userCollection.findOne(query);
  return user;
};

const updateOneUserFromDB = async (userId, userData) => {
  const filter = { _id: new ObjectId(userId) };
  const updateDoc = {
    $set: userData,
  };
  const updatedUser = await userCollection.updateOne(filter, updateDoc);
  return updatedUser;
};

const insertOneUserFromDB = async (name, email, password = "f123", role) => {
  const userExists = await userCollection.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: new Date(),
  };
  await userCollection.insertOne(newUser);
};

const deleteOneUserFromDB = async (id) => {
  const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
  return result;
};

const makeUserAdminFromDB = async (id) => {
  const result = await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "admin" } }
  );
  return result;
};

const loginUserFromDB = async (email) => {
  const result = await userCollection.findOne({ email });
  return result;
};

module.exports = {
  getAllUsersFromDB,
  getOneUserFromDB,
  updateOneUserFromDB,
  insertOneUserFromDB,
  deleteOneUserFromDB,
  makeUserAdminFromDB,
  loginUserFromDB,
};
