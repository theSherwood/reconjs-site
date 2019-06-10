const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BreachSchema = new Schema({
  code: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create collection and add schema
module.exports = Breach = mongoose.model("breaches", BreachSchema);
