"use strict";

const { reset } = require("nodemon");
//const { post } = require("../../Classwork 8 - 9 - 10 - API and Deployment/recipe_app/routes/apiRoutes");

const User = require("../models/user"),
  Post = require("../models/posts"),
  passport = require("passport"),
  mongoose = require("mongoose"),


  getUserParams = body => {
    return {
      firstName: body.firstName,
      lastName: body.lastName,
      Gender: body.Gender,
      Age: body.Age,
      Handle: body.Handle,
      UniqueID: body.UniqueID,
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
    res.render("users/home");
  },
  new: (req, res) => {
    res.render("users/new");
  },


  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user;
        console.log(req.params.id);
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
      })
  },
  showEdit: (req, res) => {
    res.render("users/edit");
  },


  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = getUserParams(req.body);

    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(subscriber => {
        res.locals.redirect = `/users/${userId}/userPage`;
        next();
      })
      .catch(error => {
        console.log(`Error updating User by ID: ${error.message}`);
        next(error);
      });
  },


  create: (req, res, next) => {
    if (req.skip) return next();
    let userParams = getUserParams(req.body);


    //need a check to run through in the DB the UserID is unique
    let newUser = new User(userParams);
    newUser.Handle = newUser.Username;
    var min = Math.ceil(10000);
    var max = Math.floor(99999);
    newUser.UniqueID = Math.floor(Math.random() * (max - min + 1)) + min;

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

  validate: (req, res, next) => {

    req.check("email", "email is not valid!").isEmail();

    req.check("password", "Password can not be empty.").notEmpty();

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.flash("error", messages.join(" and "));
        req.skip = true;
        //console.log("here1");
        res.local.redirect = "/homepage";
        next();
      }
      else
        next();
    });
  },

  authenticate: passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true,

  successRedirect: `/soemthjing23` }),
  function(req, res) {
  console.log("hello");
  console.log(req);
  res.redirect('/');
  },

  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/"
    next();
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath != undefined) res.redirect(redirectPath);
    else next();
  },


    //User Signin Methods
  //------------------ start ------------------
  signinUser: (req, res, next) => {
    const db = mongoose.connection;
    var dbo = db

    var queryUsername = { Username: req.body.username, Password: req.body.password };
    var queryPassword = { Password: req.body.password };

    var queryResult;


    dbo.collection("users").findOne(queryUsername)
      .then(result => {

        if (result) {
          //console.log(result); //prints signed in user
          res.locals.redirect = `users/${result._id}/home`;
          res.locals.currentUser = result;
          //console.log("User ID:");
          //console.log(res.locals.currentUser._id);
          next();

        } else {
          req.flash("failure", "Error signing in");
          res.render("signin");
          next();
        }
      })
      .catch(err => console.error(`Failed to find document: ${err}`));
  },
  //------------------ end ------------------



  //User Friends Methods
  //------------------ start ------------------
  showFriends: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
      })
  },
  showViewFriends: (req, res) => {
    res.render("users/myFriends");
  },
  //------------------ end ------------------




  //User Home Methods
  //------------------ start ------------------
  showHome: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user;
        Post.find().sort({ createdAt : `descending`})
          .then(posts => {
            res.locals.posts = posts;
            //console.log(res.locals.posts);
            next();
          })
          .catch(error => {
            console.log(`Error fetching course data: ${error.message}`);
            next(error);
          })
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
      })
  },
  showViewHome: (req, res) => {
    res.render("users/home");
  },
  //------------------ end ------------------




  //User Page Methods
  //------------------ start ------------------
  showUserPage: (req, res, next) => {
    let userId = req.params.id;
    //console.log(req.params.id);
    //console.log(userId)
    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user;
        //console.log(user);
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
      })
  },
  showViewUserPage: (req, res) => {
    res.render("users/userPage");
  },
  //------------------ end ------------------




  //User Project Methods
  //------------------ start ------------------
  showProjects: (req, res, next) => {

    let userId = req.params.id;
    console.log("RES")
    //console.log(userId)

    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
      })
  },
  showViewProjects: (req, res) => {
    res.render("users/myProjects");
  },
  //------------------ end ------------------




  //User Post Methods
  //------------------ start ------------------
  showPosts: (req, res, next) => {

    let userId = req.params.id;

    const db = mongoose.connection;
    var dbo = db



    User.findById(userId)
      .then(user => {
        res.locals.currentUser = user;


        var queryID = { postingUserID: userId };

        Post.find(queryID)
          .then(posts => {
            res.locals.posts = posts;
            //console.log(res.locals.posts);
            next();
          })
          .catch(error => {
            console.log(`Error fetching course data: ${error.message}`);
            next(error);
          })


      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
      })




  },
  showViewPosts: (req, res) => {
    res.render("users/myPosts");
  },

  //idk if we even need this
  filterUserPosts: (req,res,next) => {
    let currentUser = res.locals.currentUser;
    if (currentUser) {
      let mappedPosts = res.locals.posts.map((Post) => {
        let userPosts = currentUser.posts.some((userPosts) => {
          return userCourse.equals(posts._id);
        });
        return Object.assign(posts.toObject(), {joined: userPosts});
      });
      res.locals.courses = mappedPosts;
      next();
    } else {
      next();
    }
  },





  //------------------ end ------------------
}