// IMPORT MODULES
const express = require("express");
const Register = express.Router();
const passport = require("passport");

// IMPORT DATA MODEL
const User = require("../models/User");

// INITIALIZE EXPRESS APP
const app = express();

// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
Register.get("/", (req, res) => {
  res.render("register", { error: "" });
});

Register.post("/", (req, res) => {
  // REGISTER USER USING MONGOOSE PASSPORT
  User.register(
    new User({
      username: req.body.username,
      fullname: req.body.fullName,
      nin: req.body.nin,
      ownedResidence: 0,
      totalUnit: 0,
      ResidenceWorth: 0,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.json({ err: err });
        res.redirect("/register");
        return;
      } else {
        passport.authenticate("local")(req, res, () => {
          console.log("User registered");
          console.log(user);
          res.redirect("/register/bank");
          return;
        });
      }
    }
  );
});

Register.get("/bank", (req, res) => {
  res.render("bank", { error: "" });
});

Register.post("/bank", (req, res) => {
  const bankDetails = {
    bankName: req.body.bankName,
    accountNumber: req.body.accountNumber,
    accountName: req.body.accountName,
  };
  User.findOne({ id: req.user._id }, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register/bank");
    } else {
      user.bankDetails = bankDetails;
      user.save();
      res.redirect("/investmentpage");
    }
  });
});

module.exports = Register;
