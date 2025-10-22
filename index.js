const express = require("express");
const cors = require("cors");
const { connectDB } = require("./server/mongoClient");
const userRouter = require("./server/routes/user.router");
const foodRouter = require("./server/routes/food.router");
const orderRouter = require("./server/routes/order.router");
const cartRouter = require("./server/routes/cart.router");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to database
connectDB().catch(() => console.log("Something went wrong in database..."));

// All Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", foodRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

// Basic test route
app.get("/", (req, res) => {
  res.send("I am here to listen from 5000");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("App is listening on", process.env.PORT);
});
