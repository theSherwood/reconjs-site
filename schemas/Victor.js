const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VictorSchema = new Schema({
  name: {
    type: String
  },
  breach: {
    type: Schema.Types.ObjectId,
    ref: "breaches"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create collection and add schema
module.exports = Victor = mongoose.model("victors", VictorSchema);
