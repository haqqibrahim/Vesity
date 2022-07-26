// IMPORT MODULES
const express = require("express");
const multer = require("multer");
const Estate = express.Router();
const passport = require("passport");
const fs = require("fs");

// IMPORT USER MODELS
const Estates = require("../models/Estate");

// INITALIZE EXPRESS APP
const app = express();

// PASSPORT CONFIGURATION // AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// ROUTE
Estate.get("/", (req, res) => {
 if(req.isAuthenticated) {
  res.render("estate");
 } else {
  res.redirect("/login");
 }
});

Estate.post("/", upload.single("picture"), (req, res) => {
if(req.isAuthenticated) {
    // REGISTER NEW ESTATE
    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString("base64");
    const finalImg = {
      contentType: req.file.mimetype,
      image: new Buffer.from(encode_img, "base64"),
    };
    const newEstate = new Estates({
      id: req.body.id,
      image: {
        data: finalImg.image,
        contentType: finalImg.contentType,
      },
      name: req.body.landName,
      address: req.body.location,
      price: req.body.price,
      numberOfInvestors: req.body.numberOfInvestors,
    });
  
    newEstate
      .save()
      .then(() => {
        console.log("Estate added");
        res.redirect("/investmentpage");
      })
      .catch((err) => {
        console.log(err);
      });
} else {
  res.redirect("/login");
}
});

module.exports = Estate;
