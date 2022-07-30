// IMPORT MODULES
const express = require("express");
const Detailspage = express.Router();
const Estate = require("../models/Estate");
const User = require("../models/User");

// ROUTES
Detailspage.get("/:id", (req, res) => {
  console.log(req.params.id);
  if (req.isAuthenticated()) {
    // GET ALL ESTATES
    Estate.findOne({ id: req.params.id }, (err, estate) => {
      if (err) {
        console.log(err);
      } else {
        res.render("details", { estate: estate });
      }
    });
  } else {
    res.redirect("/login");
  }
});

Detailspage.post("/:id", (req, res) => {
  Estate.findOne({ name: req.params.id }, (err, estate) => {
    if (err) {
      console.log(err);
    } else {
      User.findOne({ username: req.user.username }, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          user.estates.push({
            image: estate.image,
            name: estate.name,
            address: estate.address,
            price: estate.price,
            unit: req.body.unit,
            numberOfInvestors: estate.numberOfInvestors,
            pricePaid: req.body.unit * estate.price,
          });
          user.ownedResidence += 1;
          user.totalUnit += parseInt(req.body.unit);
          user.ResidenceWorth += parseInt(req.body.unit) * estate.price;
          user.save();
          console.log("Investment made");
         
        }
      });
    }
  });
});

module.exports = Detailspage;
