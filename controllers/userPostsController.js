"use strict";

const { reset } = require("nodemon");

const Post = require("../models/userPosts"),
  passport = require("passport"),
  mongoose = require("mongoose"),

  getPostParams = body => {
      return {
          caption: body.caption,
          Picture: body.Picture,
          userName: body.userName,
          comments: body.comments,
          likes: body.likes
      };
  };

module.exports = {
    //methods here
}