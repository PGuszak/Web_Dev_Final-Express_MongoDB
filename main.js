//"C:\Users\gusza\OneDrive\Desktop\College\Senoir Year\Spring 2021\Special Topics\Web_Dev_Final_Project+Exp_Node_MDB"
//use CTRL+SHIFT+M for seeing readme preview
const express = require("express"), app = express(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
userController = require("./controllers/usersControllers"),
layouts = require("express-ejs-layouts"),
 mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Orbit_Users", {useNewUrlParser: true})

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);


//default loader change to main page
app.get("/", homeController.showSignIn)  //this is what renders first in the layout.ejs file

//pre processing requests
app.use(express.static("public"));  //can serve static content to users
app.use(
    express.urlencoded({
        extended: false,
    })
);




//ROUTES

//main
app.use(express.json());
app.use(express.static(__dirname + '/public'));  //so we can access the public folder


//main routes for pages in the views ejs files
app.get("/signup", homeController.showSignUp);
app.post("/signup", userController.saveUser);

app.get("/signin", homeController.showSignIn);
app.post("signin", userController.signinUser);

//error pages go to errorControler.js for the renders
app.use(errorController.internalServererror); //there is a server error
app.use(errorController.pageNotFoundError); //the page is not found/exists



app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});
