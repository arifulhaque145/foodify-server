const {
  getAllUsersFromDB,
  getOneUserFromDB,
  updateOneUserFromDB,
  deleteOneUserFromDB,
  insertOneUserFromDB,
  makeUserAdminFromDB,
} = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersFromDB();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: err.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getOneUserFromDB(userId);
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: err.message });
  }
};

const updateOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await updateOneUserFromDB(userId, userData);
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: err.message });
  }
};

const insertOneUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  try {
    insertOneUserFromDB(name, email, password, role);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const deleted = await deleteOneUserFromDB(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const makeUserAdmin = async (req, res) => {
  try {
    const updated = makeUserAdminFromDB(req.params.id);
    if (!updated)
      return res.status(404).json({ msg: "User not found or already admin" });
    res.status(200).json({ msg: "User promoted to admin" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUserFromDB(email);
    if (!user)
      return res.status(401).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid email or password" });

    // TODO: generate a token here (JWT)
    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        authType: user.authType,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  updateOneUser,
  insertOneUser,
  deleteOneUser,
  makeUserAdmin,
  loginUser,
};
