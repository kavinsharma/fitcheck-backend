const mongoose = require("mongoose");
const config = require("../../config");

let dbConnection;

const options = {
  connectTimeoutMS: 200000,
  socketTimeoutMS: 2000000,
  useNewUrlParser: true,
  dbName: config.DB_NAME,
};
exports.connectToReqDatabase = async (req, res, next) => {
  if (dbConnection) {
    console.log("----DB----PREVIOUS-CONNECTION----------------");
    next();
  } else {
    mongoose.connect(config.MONGODB_CONNECTION_URL, options).then(
      db => {
        console.log("----DB----NEW-CONNECTION----------------");
        dbConnection = db.connections[0].readyState;
        console.log("----DB----NEW-CONNECTION-INIT----------------");
        next();
      },
      err => {
        console.log("----DB----ERROR-CONNECTION----------------");
        console.log(err);
        return res.send({
          status_code: 409,
          success: false,
          message: "DB connection failure",
        });
      },
    );
  }
};
