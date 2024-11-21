const mongoose = require("mongoose");
const { Schema } = mongoose;
const { MediaType } = require("../../core/enum/auth.enum");

// Define Mongoose Schema
const assetSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
    },
    deviceId: {
      type: Schema.ObjectId,
    },
    default: {
      type: Boolean,
      default: false,
    },
    media: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      //   enum: Object.values(MediaType),
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

const assetsModel = mongoose.model("assets", assetSchema);
module.exports = assetsModel;
