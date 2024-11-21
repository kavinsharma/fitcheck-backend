const mongoose = require("mongoose");

const StyleTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  },
);

// Explicitly specify the collection name
const StyleType = mongoose.model(
  "StyleType",
  StyleTypeSchema,
  "styleTypeMasters",
);

module.exports = StyleType;
