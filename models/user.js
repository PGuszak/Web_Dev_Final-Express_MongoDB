  
const mongoose = require('mongoose'),
passportLogicalMongoose = require("passport-local-mongoose"),

{ Schema } = require('mongoose'),
passport = require("passport");

UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        Gender: String,
        City_State: String,
        Username: {type: String, unique: true},
        Relationship: {type: String, default:"-"},
        Highschool: {type: String, default:"-"},
        University: {type: String, default:"-"},
        Work: {type: String, default:"-"},
        Handle: String,
        UniqueID: {type: Number, unique: true, default:0},
        Age: {type: Number, default: 0},
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
        SecurityA3: String,

        //following: [{ type: Schema.Types.ObjectId, ref: "Following" }]
        following: []
    },
    {
        timestamps: true
    }
);


UserSchema.plugin(passportLogicalMongoose, {
    usernameField: "Username",
    passwordField: 'Password'
  });

module.exports = mongoose.model("User", UserSchema);