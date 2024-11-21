const mongoose = require("mongoose");
const { Purpose } = require("../../core/enum/auth.enum");

// Define Mongoose Schema
const OTPSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
      index: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      index: true,
      sparse: true,
    },
    countryCode: {
      type: String,
    },
    purpose: {
      type: String,
      enum: Object.values(Purpose),
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Define Mongoose Model
OTPSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model("otps", OTPSchema);
