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
  if (!r.check(req.body.code)) {
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
  } else {
    return res
      .status(400)
      .json({ error: "code did not pass second Recon check" });
  }
});

app.all("*", (req, res) => {
  res.status(405).json({ error: "only POST requests are accepted" });
});
