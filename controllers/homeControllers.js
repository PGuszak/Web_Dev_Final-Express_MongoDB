//made templates for routes when clicked
exports.showSignUp = (req, res) => {
    res.render("signup");
}

exports.showSignIn = (req, res) => {
    res.render("signin"); 
}

exports.ShowHomePage = (req, res) => {
    res.render("homepage");
}

exports.userPage = (req, res) => {
    res.render("userPage"); //loads the ejs file with this name
}