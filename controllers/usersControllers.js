const User = require("../models/user");

exports.saveUser = (req, res) => {
    //check to see paswords match - if not show error and highlight background
    //check if password has
        //small letter, capital letter, and a number
        //if not show error message and highlight feilds
    
    //Initialize stuff 
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
};


exports.signinUser = (req, res) => {
    //sign in here
    //  NEED LOGIC FOR LOGIN    

    //if work
    res.render("home");
}