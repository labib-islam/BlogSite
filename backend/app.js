const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

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

// Middleware Setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies from the request headers

// Routes
app.use("/api/auth", require("./routers/authRouter"));
app.use("/api/category", require("./routers/categoryRouter"));
app.use("/api/blog", require("./routers/blogRouter"));
app.use("/api/user", require("./routers/userRouter"));

// handle undefined paths (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: "The requested path was not found." });
});
