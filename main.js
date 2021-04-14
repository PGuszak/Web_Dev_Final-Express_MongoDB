//"C:\Users\gusza\OneDrive\Desktop\College\Senoir Year\Spring 2021\Special Topics\Web_Dev_Final_Project+Exp_Node_MDB"

const layouts = require("express-ejs-layouts");

//use CTRL+SHIFT+M for seeing readme preview
const express = require("express"), 
app = express(),
router = express.Router(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
userController = require("./controllers/usersControllers"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"),
methodOverride = require("method-override"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
mongoose = require("mongoose");



//mongoose connection
mongoose.connect("mongodb://localhost:27017/Orbit_Users", { useNewUrlParser: true });
mongoose.set("userCreateIndex", true);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
//*********************

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
router.use(
    express.urlencoded({ 
        extended: false,
    })

    );
router.use(express.json());
app.use(express.static(__dirname + '/public'));  //so we can access the public folder

//preprosessing 
router.use(express.static("public"));  //can serve static content to users
router.use(layouts);
app.use(methodOverride("_method", {methods: ["POST", "GET", "PUT"]}));
app.use("/", router);
//*******************


router.get("/", homeController.showSignIn); //this is what renders first in the layout.ejs file


router.get("/signup", homeController.showSignUp);
router.post("/signup", userController.saveUser);

router.get("/signin", homeController.showSignIn);
router.post("/signin", userController.signinUser);

//error pages go to errorControler.js for the renders
router.use(errorController.internalServererror); //there is a server error
router.use(errorController.pageNotFoundError); //the page is not found/exists



app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});
