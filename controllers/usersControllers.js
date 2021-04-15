"use strict";

const { reset } = require("nodemon");

const User = require("../models/user"),
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
};

module.exports = {
  index: (req, res, next) => {
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
    let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
  },
  /*
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
      .catch((error) => { res.send(error) });
  },
*/


  create: (req, res, next) => {
    if (req.skip) return next();
    let userParams = getUserParams(req.body);

    let newUser = new User(userParams);


    //.register does not work
    User.register(newUser, req.body.Password, (error, user) => {
      if (user) {
        req.flash("success", 'User Account Successfully Created!');
        newUser.save();
        res.locals.redirect = "/signin";
        next();
      }
      else {
        req.flash("error", `Failed to create user account: ${error.message}`);
        res.locals.redirect = "/signup";
        next();
      }
    });
  },

  //  FIX THIS SHIT 
  validate: (req, res, next) => {

    req.check("email", "email is not valid!").isEmail();

    req.check("password", "Password can not be empty.").notEmpty();

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.flash("error", messages.join(" and "));
        req.skip = true;
        console.log("here1");
        res.local.redirect = "/homepage";
        next();
      }
      else
        next();
    });
  },

  authenticate: passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: "Failed to login.",
    successRedirect: "/",
    successFlash: "Logged in!"
  }),

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/"
    next();
  },

  redirectView: (req, res, rext) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath != undefined) res.redirect(redirectPath);
    else next();
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
        if (result) {
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