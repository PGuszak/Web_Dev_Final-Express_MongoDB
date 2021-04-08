"use strict";

const User = require("../models/user"),
mongoose = require("mongoose");

module.exports= {
  index:(req,res,next) => {
    User.find()
    .then(users => {
        res.locals.users = users;
        next()
    })
    .catch(error => {
        console.log(`Error fetching user data: ${error.message}`);
        next(error);
    })
  },
  indexView: (req, res) => {
      res.render("users/index");
  },
  new: (req, res) => {
      res.render("users/new");
  },
  edit: (req, res) => {
    //edit page needs to be built
  },
  saveUser: (req, res) => {
      let newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          Gender: req.body.Gender,
          City_State: req.body.City_State,
          Username: req.body.Username,
          Email: req.body.Email,
          Password: req.body.Password,
          Vpassword: req.body.Vpassword,
          DOB: req.body.DOB,
          Bio: req.body.Bio,
          SecurityQ1: req.body.SecurityQ1,
          SecurityA1: req.body.SecurityA1,
          SecurityQ2: req.body.SecurityQ2,
          SecurityA2: req.body.SecurityA2,
          SecurityQ3: req.body.SecurityQ3,
          SecurityA3: req.body.SecurityA3
      });
      newUser.save()
      .then(() => {
          res.render("signin");
      })
      .catch((error) => {res.send(error)});
  },
  signinUser: (req, res) => {
      //console.log(req.body.username);
      
      const db = mongoose.connection;
      var dbo = db

      var queryUsername = { Username: req.body.username, Password: req.body.password };
      var queryPassword = { Password: req.body.password };

      var queryResult; 


      return dbo.collection("users").findOne(queryUsername)
    .then(result => {
      if(result) {
        //console.log(result); //prints signed in user
        res.render("home");

      } else {
        console.log("No document matches the provided query.");
        res.render("signin");
      }
      return result;
    })
    .catch(err => console.error(`Failed to find document: ${err}`));   
  }
}