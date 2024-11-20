const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    userName: {
      type: String,
    },
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
