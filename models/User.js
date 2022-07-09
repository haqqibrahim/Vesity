// IMPORT MODULES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// CRATING SCHEMA
const UserSchema = new Schema({
  fullname: String,
  username: String,
  nin: String,
  password: String,
  ownedResidence: Number,
  totalUnit: Number,
  ResidenceWorth: Number,
  estates: [
    {
      image: {
        data: Buffer,
        contentType: String,
      },
      name: String,
      address: String,
      price: String,
      unit: String,
      numberOfInvestors: String,
      pricePaid: String
    },
  ],
});

// USING PASSPORT LOCAL MONGOOSE
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
