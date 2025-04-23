const express = require("express");
const cors = require("cors");
const { connectDB } = require("./server/mongoClient");
const userRouter = require("./server/routes/user.router");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to database
connectDB().catch(() => console.log("Something went wrong in database..."));

// All Routes
app.use("/api/v1", userRouter);

// Basic test route
app.get("/", (req, res) => {
  res.send("I am here to listen from 5000");
});

app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10h",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});

app.post("/logout", (req, res) => {
  res
    .clearCookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("App is listening on", process.env.PORT);
});
