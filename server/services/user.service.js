const bcrypt = require("bcrypt");
const { foodifyDB } = require("../mongoClient");

const userCollection = foodifyDB.collection("users");

const getAllUsersFromDB = async () => {
  const users = await userCollection.find({}).toArray();
  return users;
};

const getOneUserFromDB = async (userId) => {
  const query = { job_id: userId };
  const user = await userCollection.find(query).toArray();
  return user;
};

const updateOneUserFromDB = async (userId, userData) => {
  const filter = { _id: new ObjectId(userId) };
  const updateDoc = {
    $set: {
      role: userData.role,
    },
  };
  const updatedUser = await userCollection.updateOne(filter, updateDoc);
  return updatedUser;
};

const insertOneUserFromDB = async (name, email, password, role) => {
  const userExists = await userCollection.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    role, // 'admin' or 'user'
    authType: "local",
    createdAt: new Date(),
  };
  await db.collection("users").insertOne(newUser);
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
  const result = await authService.findUserByEmail(email);
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
