// imports
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Routes
const studentsRoutes = require("./Routes/student");
const userRoutes = require("./Routes/users");

const app = express();
// helpers

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// APIs
app.use("/api/student", studentsRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to Database successfully");
  })
  .catch((err) => console.log(err));

// App Listening
app.listen(8000, () => {
  console.log("app is listen to port 8000");
});
