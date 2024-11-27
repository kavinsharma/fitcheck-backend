const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  platform: {
    type: String,
    enum: ["app_store", "play_store"],
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
    unique: true,
  },
  productId: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "canceled", "refunded"],
    default: "active",
  },
  platformResponse: {
    type: Object,
    required: false,
  },
  isTrial: {
    type: Boolean,
    default: false,
  },
  autoRenew: {
    type: Boolean,
    default: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const MembershipModel = mongoose.model("Membership", membershipSchema);

module.exports = MembershipModel;
