//"C:\Users\gusza\OneDrive\Desktop\College\Senoir Year\Spring 2021\Special Topics\Web_Dev_Final_Project+Exp_Node_MDB"

const user = require("./models/user");

//use CTRL+SHIFT+M for seeing readme preview
const express = require("express"), 
app = express(),
router = express.Router(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
userController = require("./controllers/usersControllers"),
layouts = require("express-ejs-layouts"),
methodOverride = require("method-override"),
passport = require("passport"),
cookieParser = require("cookie-parser"),
expressSession = require("express-session"),
expressValidator = require("express-validator"),
connectFlash = require("connect-flash"),
mongoose = require("mongoose");
User = require("./models/user");



//mongoose connection
mongoose.connect("mongodb://localhost:27017/Orbit_Users", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});




app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

router.use(
    express.urlencoded({ 
        extended: false,
    })
);

router.use(express.json());

router.use(expressValidator());
router.use(cookieParser("my_passcode"));

app.use(express.static(__dirname + '/public'));  //so we can access the public folder

router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})




//preprosessing 
router.use(express.static("public"));  //can serve static content to users
router.use(layouts);





//normal routes
router.get("/", homeController.showSignIn); //this is what renders first in the layout.ejs file

router.get("/signup", homeController.showSignUp);
router.post("/signup", userController.create, userController.redirectView);

router.get("/signin", homeController.showSignIn);
router.post("/signin", userController.signinUser, userController.redirectView);
router.get("/home/:id", userController.showHome, userController.showViewHome);


router.get("/users/userPage", userController.showUserPage, userController.showViewUserPage);

router.get("/users/posts", userController.showPosts, userController.showViewPosts);
router.get("/users/projects", userController.showProjects, userController.showViewProjects);
router.get("/users/friends", userController.showFriends, userController.showViewFriends);

//router.get("/user/edit", userController.edit);




//error pages go to errorControler.js for the renders
router.use(errorController.internalServererror); //there is a server error
router.use(errorController.pageNotFoundError); //the page is not found/exists

app.use("/", router);


app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});
