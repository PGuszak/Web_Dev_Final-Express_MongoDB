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
    redirectView: (req, res, rext) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }

}