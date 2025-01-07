const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// Server Setup
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

// Dependancies
app.use(express.json());
app.use(cookieParser());
app.use("/public/images", express.static(path.join("public", "images")));

// For Cross-Origin HTTP Requests
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./routers/userRouter"));
app.use("/api/blogs", require("./routers/blogRouter"));
app.use("/api/admin", require("./routers/adminRouter"));
