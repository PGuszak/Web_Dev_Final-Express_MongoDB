const mongoose = require('mongoose'),
passportLogicalMongoose = require("passport-local-mongoose"),

{ Schema } = require('mongoose'),
passport = require("passport");

UserPostsSchema = new Schema(
    {
        caption: {type: mongoose.Types.String, required: true}, 
        postPicture: {type: mongoose.Types.String, required: true},
        userName: {type: mongoose.Types.String, required: true},
        comments: {type: mongoose.Types.String},
        likes: {type: mongoose.Types.Number}

        
    },
    {
        timestamps: true
    }
);


UserSchema.plugin(passportLogicalMongoose, {
    usernameField: "userName"
  });

module.exports = mongoose.model("Post", UserPostsSchema);