const { foodifyDB } = require("../config/mongoClient");
const userCollection = foodifyDB.collection("users");

const verifyAdmin = async (req, res, next) => {
  const email = req.user?.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

const verifyOwner = async (req, res, next) => {
  const email = req.user?.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  const isOwner = user?.role === "owner" || user?.role === "admin";
  if (!isOwner) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    const email = req.user?.email;
    const user = await userCollection.findOne({ email });

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).send({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { verifyAdmin, verifyOwner, authorizeRoles };
