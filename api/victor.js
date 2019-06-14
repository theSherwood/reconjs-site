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
  if (name.length > 20 || name.length < 1) {
    return res
      .status(400)
      .json({ error: "names must be between 1 and 20 characters in length" });
  }
  Breach.findById(breachId)
    .then(breach => {
      // check if breach already has a victor associated
      // bail if true
      if (breach.victor) {
        return res.status(405).json({
          error: "that breach already has an associated name"
        });
      }
      const newVictor = new Victor({
        name,
        breach: breach._id
      });
      newVictor
        .save()
        .then(victor => {
          // point breach.victor at victor
          breach.victor = victor._id;
          breach
            .save()
            .then(() => res.status(200).json({ success: "true" }))
            .catch(err => res.status(405).json({ error: err }));
        })
        .catch(err => res.status(405).json({ error: err }));
    })
    .catch(err => res.status(405).json({ error: err }));
});

app.get("*", (req, res) => {
  Victor.find()
    .sort({ date: -1 })
    .then(victors => {
      const paredVictors = victors.slice(0, 20).map(victor => ({
        name: victor.name,
        date: victor.date
      }));
      res.status(200).json(paredVictors);
    })
    .catch(err => res.status(405).json({ error: err }));
});

app.all("*", (req, res) => {
  res.status(405).json({ error: "only POST requests are accepted" });
});
