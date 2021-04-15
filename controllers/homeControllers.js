"use strict";

module.exports = {
    showSignIn: (req, res) => {
        res.render("signin");
    },
    showHomepage: (req, res) => {
        res.render("home.ejs");
    },
    showSignUp: (req, res) => {
        res.render("signup");
    },
}