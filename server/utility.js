// Token Verification
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send({ message: "unauthorized access" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
