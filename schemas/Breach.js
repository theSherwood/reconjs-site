const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BreachSchema = new Schema({
  code: {
    type: String
  },
  victor: {
    type: Schema.Types.ObjectId,
    ref: "victors"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create collection and add schema
module.exports = Breach = mongoose.model("breaches", BreachSchema);
