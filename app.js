const express = require("express");
require("dotenv").config({
  path: ".env",
});
const bodyParser = require("body-parser");

// IMPORT MODEL FILES
const Book = require("./models/Book");

// Require Mongoose
const mongoose = require("mongoose");

// Connect Mongoose
const db = mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
});

// Create an express app
var app = express();
const bookRouter = require("./routes/bookRoutes")(Book);


// Config BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Create book Router
app.use("/api", bookRouter);

app.get("*", (req, res) => {
  res.send("<h2>404: Page not found!</h2>");
});

const port = process.env.PORT || 3400;

app.get("/", (req, res) => {
  res.send("Hello API World!");
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});