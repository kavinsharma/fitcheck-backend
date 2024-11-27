const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    userName: {
      type: String,
    },
    name: {
      type: String,
      require: "Name is required",
    },
    email: {
      type: String,
      lowercase: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    countryCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    authType: {
      type: String,
      enum: ["google", "ios", "email", "phone"],
    },
    status: {
      type: String,
      enum: ["active", "archieved", "in-active", "blocked"],
      default: "active",
    },
    password: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    googleKey: {
      type: String,
    },
    verifiedUser: {
      type: Boolean,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("users", userSchema);
