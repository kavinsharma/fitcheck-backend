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
    family: {
      type: Boolean,
      default: false,
    },
    membership: {
      type: Boolean,
      default: false,
    },
    membershipId: {
      type: Schema.ObjectId,
    },
    brands: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 5;
        },
        message: "You can add  at most 5 brands.",
      },
    },
    styleType: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.length <= 3;
        },
        message: "You can add  at most 3 Stype Types.",
      },
    },
  },
  {
    timestamps: true,
  },
);

const BasicDetailsModel = mongoose.model("userBasicDetails", userBasicSchema);

module.exports = { BasicDetailsModel };
