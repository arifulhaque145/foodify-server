const bcrypt = require("bcrypt");
const { foodifyDB } = require("../mongoClient");

const userCollection = foodifyDB.collection("users");

const getAllUsersFromDB = async () => {
  const users = await userCollection.find({}).toArray();
  return users;
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

module.exports = {
  getAllUsersFromDB,
  insertOneUserFromDB,
};
