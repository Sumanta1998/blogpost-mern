const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");
const db = require("./db/db");
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

// mongoose.connect(process.env.MONGO_URL_DEV);
db.connect(DB_HOST);

const app = express();
// Log request data
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Setup CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/admin", adminRoutes);
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error,
  });
});

app.listen(PORT, () => {
  console.log("Listening " + PORT);
});
// module.exports = app;
