const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri);
const foodifyDB = client.db(`${process.env.DB_NAME}`);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database Connected Successfully...");
  } catch (error) {
    console.error("Failed to connect MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connectDB, foodifyDB };
