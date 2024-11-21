const mongoose = require("mongoose");
const config = require("../../config");

let isConnected = false;

const options = {
  dbName: config.DB_NAME,
};

const connectToDb = async () => {
  try {
    if (isConnected) {
      console.log('----DB----PREVIOUS-CONNECTION----------------');
      return 'connected'
    } else {
      console.log('----DB----NEW-CONNECTION----------------');
      await mongoose.connect(config.MONGODB_CONNECTION_URL, options);
      isConnected = mongoose.connection;
      console.log('----DB----NEW-CONNECTION-INIT---------------');
      return 'connected'
    }
  } catch (err) {
    console.log('----DB----ERROR-CONNECTION----------------');
    console.log(err);
    return 'failed'
  }
};

module.exports = { connectToDb };
