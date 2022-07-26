// IMPORT MODULES
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const mongoosee = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");

// IMPORT ROUTES
const home = require("../routes/home");
const register = require("./routes/register");
const login = require("./routes/login");
const investmentpage = require("./routes/investmentpage");
const estate = require("./routes/estate");
const details = require("./routes/details");
const account = require("./routes/account");
// IMPORT DATA MODEL
const User = require("./models/User");

// INITIALIZE EXPRESS APP
const app = express();

// SETTING UP SESSION
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// DATABASE CONNECTION
mongoosee.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Database connected");
});

// ROUTES
// app.use("/", preload);
app.use("/", home);
app.use("/register", register);
app.use("/login", login);
app.use("/investmentpage", investmentpage);
app.use("/estate", estate);
app.use("/details", details);
app.use("/account", account);
app.get("/logout", (req, res) => {
  // LOGUT USER FROM SESSION
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// Basic Authentication for session and cookies
function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
    console.log("User not logged in");
    res.redirect("/login");
  } else {
    res.redirect("/investmentpage");
  }
}
app.use(auth);

// LISTEN ON PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
