// IMPORT MODULES
const express = require("express");
const passport = require("passport");
const Login = express.Router();


const app = express();

// IMPORT DATA MODEL
const User = require("../models/User");

// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
Login.get("/", (req, res) => {
  res.render("login");
});

Login.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("User logged in");
        res.redirect("/investmentpage");
      });
    }
  });
});

module.exports = Login;
