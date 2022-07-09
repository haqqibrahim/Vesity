// IMPORT MODULES
const express = require("express");
const Preload = express.Router();

// ROUTES
Preload.get("/", (req, res) => {
  res.render("preload");
})

module.exports = Preload;