const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ScoreSchema = new Schema({
  name: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create collection and add schema
module.exports = Score = mongoose.model("scores", ScoreSchema);
