//"C:\Users\gusza\OneDrive\Desktop\College\Senoir Year\Spring 2021\Special Topics\Web_Dev_Final_Project+Exp_Node_MDB"

const { MongoTimeoutError } = require("mongodb");
const user = require("./models/user");

//use CTRL+SHIFT+M for seeing readme preview
const express = require("express"),
    app = express(),
    //replace below then replace all routers (except one) with app
    //router = express.Router(),
    // V this line should be
    router = require("./routes/index"),
    homeController = require("./controllers/homeControllers"),
    errorController = require("./controllers/errorController"),
    userController = require("./controllers/usersControllers"),
    userPostController = require("./controllers/userPostsController"),
    passport = require("passport"),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    mongoose = require("mongoose"),
User = require("./models/user");



//mongoose connection

//need to change db later for cloud implementation
mongoose.connect("mongodb://localhost:27017/Orbit_App", { useNewUrlParser: true }); 

mongoose.set("useCreateIndex", true);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());
app.use(expressValidator());
app.use(cookieParser("my_passcode"));

app.use(express.static(__dirname + '/public'));  //so we can access the public folder

app.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 360000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});




//preprosessing 
app.use(express.static("public"));  //can serve static content to users
app.use(layouts);

/* //commented out for the name spaces here for notes
//signup routes
router.get("/", homeController.showSignIn); //this is what renders first in the layout.ejs file
router.get("/signup", homeController.showSignUp);
router.post("/signup", userController.create, userController.redirectView);


//Login
router.get("/signin", homeController.showSignIn);
router.get("/signin", userController.authenticate); // doesn't work
//router.post("/signin", userController.signinUser, userController.redirectView);


//LogOut
router.get("/users/logout", userController.logout, userController.redirectView);


//HOME
router.get("/home", userController.showHome, userController.showViewHome);


//userPage
router.get("/users/:id/userPage", userController.showUserPage, userController.showViewUserPage);


//userPosts
router.post("/posts/:id/create",  userPostController.create);


//userProjects
router.get("/users/:id/projects", userController.showProjects, userController.showViewProjects);


//userFriends
router.get("/users/:id/friends", userController.showFriends, userController.showViewFriends);


//userEdit
router.get("/users/:id/edit", userController.edit, userController.showEdit);
router.put("/users/:id/update", userController.update, userController.redirectView);


//error pages go to errorControler.js for the renders
router.use(errorController.internalServererror); //there is a server error
router.use(errorController.pageNotFoundError); //the page is not found/exists

*/


app.use("/", router); // the only router variable that will stay
app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});
