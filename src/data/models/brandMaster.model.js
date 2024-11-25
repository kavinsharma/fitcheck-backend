const mongoose = require("mongoose");

const BrandMasterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      required: false,
      trim: true,
    },
    logoType: {
      type: String,
      enum: ["rectangle", "square"],
    },

    description: {
      type: String,
      required: false,
    },
    addedBy: {
      type: mongoose.Schema.ObjectId,
    },
    status: {
      type: String,
      enum: ["active", "inactive"], // To determine if the brand is currently active or not
      default: "active",
    },
    tags: [
      {
        type: [String], // Keywords associated with the brand
      },
    ],
  },
  {
    timestamps: true,
  },
);

const BrandMaster = mongoose.model("BrandMaster", BrandMasterSchema);

module.exports = BrandMaster;
