const express = require("express");
const app = express();
const { connect } = require("./broker/broker");
const listeners = require("./broker/listeners");

connect().then(() => {
  listeners();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Notification service is up & running",
  });
});

module.exports = app;
