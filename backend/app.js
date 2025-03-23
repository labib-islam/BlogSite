const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

// Server Setup
const app = express();

// Connect to Database [MongoDB]
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
