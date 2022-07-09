const express = require("express");
const Account = express.Router();
const User = require("../models/User");

Account.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("account", {
      fullname: req.user.fullname,
      username: req.user.username,
      ownedResidence: req.user.ownedResidence,
      residenceWorth: req.user.ResidenceWorth,
      totalUnit: req.user.totalUnit,
      estates: req.user.estates
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = Account;
