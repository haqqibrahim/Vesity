// IMPORT MODULES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// CREATING SCHEMA
const EstateSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  name: String,
  address: String,
  price: String,
  numberOfInvestors: String,
  id: Number
});

// USING PASSPORT LOCAL MONGOOSE
EstateSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Estate", EstateSchema);
