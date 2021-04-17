"use strict";

const { reset } = require("nodemon");

const Post = require("../models/posts"),
User = require("../models/user"),
passport = require("passport"),
mongoose = require("mongoose"),

getUserParams = body => {
    return {
      firstName: body.firstName,
      lastName: body.lastName,
      Gender: body.Gender,
      City_State: body.City_State,
      Username: body.Username,
      Email: body.Email,
      Password: body.Password,
      Vpassword: body.Vpassword,
      DOB: body.DOB,
      Bio: body.Bio,
      SecurityQ1: body.SecurityQ1,
      SecurityA1: body.SecurityA1,
      SecurityQ2: body.SecurityQ2,
      SecurityA2: body.SecurityA2,
      SecurityQ3: body.SecurityQ3,
      SecurityA3: body.SecurityA3
    };
  },


getPostParams = body => {
    return {
        userID: body.userID,
        caption: body.caption,
        postPicture: body.postPicture,
        userName: body.userName,
        comments: body.comments,
        likes: body.likes
    };
};



module.exports = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    makePost: (req, res, next) => {
        console.log("here");
        if (req.skip) return next();
        console.log("here");

        let PostParams = getPostParams(req.body);

        //might not work......
        let newPost = new Post(PostParams);
        Post.register(newPost, req.body.userID, (error, post) => {
            if (post) {
                req.flash("success", 'User Post Created!');
                newUser.save();
                res.locals.redirect = `/home/${currentUser._id}`;
                next();
            }
            else{
                req.flash("error", `Failed to create Post: ${error.message}`);
            res.locals.redirect = `/home/${currentUser._id}`;
            next();
            }
        });
    },

}