"use strict";

const mongoose = require("mongoose");
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
    return res.status(400).send({ error: "no JSON object in the request" });
  }
  const newBreach = new Breach(req.body);
  newBreach
    .save()
    .then(() => {
      res.set("Content-Type", "application/json");
      return res.status(200).send(JSON.stringify(req.body, null, 4));
    })
    .catch(err => {
      return res.status(405).send({ error: err });
    });
});

app.all("*", (req, res) => {
  res.status(405).send({ error: "only POST requests are accepted" });
});
