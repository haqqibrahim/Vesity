// IMPORT MODULES
const express = require("express");
const Home = express.Router();

// ROUTES
Home.get("/", (req, res) => {
  res.render("home");
});

module.exports = Home;
