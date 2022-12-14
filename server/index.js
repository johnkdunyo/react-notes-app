const sqlite3 = require("sqlite3");
const express = require("express");

require("dotenv").config();
const cors = require("cors");
// initialise app
const app = express();

// midlewares
app.use(cors());
app.use(express.json());

//defautl route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to react notes app api" });
});

// app error handler
app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`App started and running succesfully on PORT ${port}`);
});
