const mongoose = require("mongoose");
const config = require("../../config");

let isConnected = false;

const connectToDb = async () => {
  try {
    if (isConnected) {
      return isConnected;
    }
    const MONGO_URL = config.MONGODB_CONNECTION_URL;
    await mongoose.connect(MONGO_URL);
    isConnected = true;
    return isConnected;
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    throw error;
  }
};

module.exports = { connectToDb };
