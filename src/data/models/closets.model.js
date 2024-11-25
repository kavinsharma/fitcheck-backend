const mongoose = require("mongoose");

const ClosetSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    deviceId: {
      type: String,
      trim: true,
    },
    deviceToken: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    userImage: {
      type: String,

      trim: true,
    },
    title: {
      type: String,

      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "archived"], // Status of the closet item
      default: "active",
    },
    tags: [
      {
        type: String, // Keywords or categories associated with the product
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

const ClosetModel = mongoose.model("ClosetModel", ClosetSchema);

module.exports = ClosetModel;
