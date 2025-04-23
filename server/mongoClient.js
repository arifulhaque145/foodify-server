const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME || "foodDelivery"); // fallback db name
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("Failed to connect MongoDB:", error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
