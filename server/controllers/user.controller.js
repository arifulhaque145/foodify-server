const {
  getAllUsersFromDB,
  addUserService,
} = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersFromDB();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get users", error: err.message });
  }
};

const insertOneUser = async (req, res, next) => {
  const { name, email, password, role = "user" } = req.body;
  try {
    addUserService(name, email, password, role);
    res.status(201).json({ message: "User registered successfully" });
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  insertOneUser,
};
