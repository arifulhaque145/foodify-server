const express = require("express");
const cors = require("cors");
const { connectDB } = require("./server/mongoClient");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to database
connectDB().catch(() => console.log("Something went wrong in database..."));

// Basic test route
app.get("/", (req, res) => {
  res.send("I am here to listen from 5000");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("App is listening on", process.env.PORT);
});
