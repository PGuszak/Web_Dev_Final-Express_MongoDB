"use strict";

const { reset } = require("nodemon");

const Code = require("../models/userCode"),
  passport = require("passport"),
  mongoose = require("mongoose"),

  getCodeParams = body => {
      return {
          caption: body.caption, 
          code: body.code,
          description: body.description,
          userName: body.userName,
          comments: body.comments,
          likes: body.likes
      };
  };

module.exports = {
    //methods here
}