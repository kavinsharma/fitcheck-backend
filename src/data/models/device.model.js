const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    deviceType: {
      type: String,
    },
    deviceToken: {
      type: String,
      unique: true,
    },
    deviceUid: {
      type: String,
    },
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const DeviceModel = mongoose.model("devices", DeviceSchema);

module.exports = DeviceModel;
