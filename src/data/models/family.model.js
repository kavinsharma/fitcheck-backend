const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familySchema = Schema({
  userId: {
    type: Schema.ObjectId,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const familyModel = mongoose.model("families", familySchema);

module.exports = { familyModel };
