  
const passportLocalMongoose = require("passport-local-mongoose"),
mongoose = require('mongoose'),
{ Schema } = require('mongoose'),
passport = require("passport");

UserSchema = new Schema({
    firstName: String,
    lastName: String,
    Gender: String,
    City_State: String,
    Username: String,
    Email: String,
    Password: String,
    VPassword: String,
    DOB: Date,
    Bio: String,
    SecurityQ1: String,
    SecurityA1: String,
    SecurityQ2: String,
    SecurityA2: String,
    SecurityQ3: String,
    SecurityA3: String
},
{
    timestamps: true
}
);


UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
  });

module.exports = mongoose.model("User", UserSchema);