"use strict";

const mongoose = require("mongoose");
const Breach = require("../schemas/Breach");
const express = require("express");
const bodyParser = require("body-parser");
const Recon = require("@thesherwood/reconjs");

// Mongoose Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const r = new Recon();

const app = express();

module.exports = app;

app.use(bodyParser.json());

app.post("*", (req, res) => {
  if (req.body == null) {
    return res.status(400).json({ error: "no JSON object in the request" });
  }
  if (req.body.code.length > 2000 || req.body.code.length < 20) {
    return res.status(400).json({
      error: "the length of your code must be between 20 and 2000 characters"
    });
  }
  if (!r.check(req.body.code)) {
    // rate limit successful breaches to 10 per 24 hour period
    const limit = 300;
    const periodInHours = 24;
    Breach.find()
      .sort({ date: -1 })
      .then(breaches => {
        const limitedBreaches = breaches.slice(0, limit);
        const timestampMs = Date.parse(
          limitedBreaches[limitedBreaches.length - 1].date
        );
        const periodInMs = periodInHours * 1000 * 60 * 60;
        if (
          limitedBreaches.length === limit &&
          Date.now() - timestampMs < periodInMs
        ) {
          return res.status(504).json({
            name: "RateLimitError",
            message: "daily rate limit exceeded on successful breaches"
          });
        } else {
          const newBreach = new Breach(req.body);
          newBreach
            .save()
            .then(breach => {
              res.set("Content-Type", "application/json");
              return res.status(200).json(breach._id);
            })
            .catch(err => {
              return res.status(405).json({ error: err });
            });
        }
      });
  } else {
    return res
      .status(400)
      .json({ error: "code did not pass second Recon check" });
  }
});

app.all("*", (req, res) => {
  res.status(405).json({ error: "only POST requests are accepted" });
});
