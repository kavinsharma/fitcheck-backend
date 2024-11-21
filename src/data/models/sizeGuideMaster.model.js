const mongoose = require("mongoose");

const SizeGuideSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true, // e.g., "XXS", "XS"
    },
    countrySizes: [
      {
        country: {
          type: String, // e.g., "USA", "UK/AU", "EU"
          required: true,
          trim: true,
        },
        value: {
          type: String, // e.g., "00", "0-2", "34-36"
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

const SizeGuide = mongoose.model("SizeGuideMaster", SizeGuideSchema);

module.exports = SizeGuide;
