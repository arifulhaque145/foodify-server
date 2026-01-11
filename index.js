const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/mongoClient");
const userRouter = require("./src/routes/user.router");
const foodRouter = require("./src/routes/food.router");
const orderRouter = require("./src/routes/order.router");
const cartRouter = require("./src/routes/cart.router");
const reviewRouter = require("./src/routes/review.router");
const paymentRouter = require("./src/routes/payment.router");
const ownerRouter = require("./src/routes/owner.router");
const errorHandler = require("./src/middlewares/errorHandler");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
connectDB();

// All Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", foodRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", reviewRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", ownerRouter);

// Error Handling
app.use(errorHandler);

// Basic test route
app.get("/", (req, res) => {
  res.send("I am here to listen from 5000");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("App is listening on", process.env.PORT);
});
