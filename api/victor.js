"use strict";

const mongoose = require("mongoose");
const Victor = require("../schemas/Victor");
const Breach = require("../schemas/Breach");
const express = require("express");
const bodyParser = require("body-parser");

// Mongoose Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

module.exports = app;

app.use(bodyParser.json());

app.post("*", (req, res) => {
  if (req.body == null) {
    return res.status(400).json({ error: "no JSON object in the request" });
  }
  const { breachId, name } = req.body;
  Breach.findById(breachId)
    .then(breach => {
      console.log(breach);
      const newVictor = new Victor({
        name,
        breach: breach._id
      });
      newVictor
        .save()
        .then(() => res.status(200).json({ success: "true" }))
        .catch(err => res.status(405).json({ error: err }));
    })
    .catch(err => res.status(405).json({ error: err }));
});

app.get("*", (req, res) => {
  Victor.find()
    .sort({ date: -1 })
    .then(victors => res.status(200).json(victors))
    .catch(err => res.status(405).json({ error: err }));
});

app.all("*", (req, res) => {
  res.status(405).json({ error: "only POST requests are accepted" });
});
