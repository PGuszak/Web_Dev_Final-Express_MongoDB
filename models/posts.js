"use strict"

const mongoose = require('mongoose'),
{ Schema } = require('mongoose'),

UserPostsSchema = new Schema(
    {
        postingUserID: {type: String, required: true},
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

module.exports = mongoose.model("Post", UserPostsSchema);