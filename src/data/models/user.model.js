const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstName: {
      type: String,
      require: "First name is required",
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    countryCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
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
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("users", userSchema);
