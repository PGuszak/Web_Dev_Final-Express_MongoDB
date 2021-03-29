const User = require("../models/user");

exports.saveUser = (req, res) => {
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
}


exports.signinUser = (req, res) => {
    let checkUser = new User();
    checkUser = User.findOne({ Username: req.body.username });
    console.log(checkUser);
    if (checkUser.Password == req.body.password) {
        console.log("Matches");
        res.render("home");
    }
}