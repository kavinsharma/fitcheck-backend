const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userBasicSchema = Schema(
  {
    userId: {
      type: Schema.ObjectId,
    },
    profileImage: {
      type: String,
    },
    deviceId: {
      type: Schema.ObjectId,
      unique: true,
    },
    priceRange: {
      type: String,
    },
    fashionType: {
      type: String,
    },
    age: {
      type: Number,
    },
    size: {
      type: String,
    },
    membership: {
      type: Boolean,
      default: false,
    },
    membershipId: {
      type: Schema.ObjectId,
    },
    brands: {
      type: [String], // here we will store id's
    },
    styleType: {
      type: [String], // here we will store id's
    },
  },
  {
    timestamps: true,
  },
);

const BasicDetailsModel = mongoose.model("userBasicDetails", userBasicSchema);

module.exports = { BasicDetailsModel };
