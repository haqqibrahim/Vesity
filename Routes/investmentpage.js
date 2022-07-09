// IMPORT MODULES
const express = require("express");
const Investmentpage = express.Router();

const Estate = require("../models/Estate");

// ROUTES
Investmentpage.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    // GET ALL ESTATES
    Estate.find({}, (err, estates) => {
      if (err) {
        console.log(err);
      } else {
        res.render("investmentpage", { estates: estates });
      }
    });
  } else {
    res.redirect("/login");
  }
});
module.exports = Investmentpage;
