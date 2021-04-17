const mongoose = require('mongoose'),
passportLogicalMongoose = require("passport-local-mongoose"),

{ Schema } = require('mongoose'),
passport = require("passport");

UserPostsSchema = new Schema(
    {
        userID: {type: String, required: true},
        caption: {type: String}, 
        postPicture: {type: String},
        userName: {type: String},
        comments: {type: String},
        likes: {type: Number}        
    },
    {
        timestamps: true
    }
);


UserSchema.plugin(passportLogicalMongoose, {
    usernameField: "userName"
  });

module.exports = mongoose.model("Post", UserPostsSchema);