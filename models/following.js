"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var followingSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    userID: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Following", followingSchema);
