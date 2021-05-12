const router = require("express").Router(),
homeController = require("../controllers/homeControllers"),
userController = require("../controllers/usersControllers");


//signup routes
router.get("/", homeController.showSignIn); //this is what renders first in the layout.ejs file
router.get("/signup", homeController.showSignUp);
router.post("/signup", userController.create, userController.redirectView);


//Login
router.get("/signin", homeController.showSignIn)
//router.get("/signin", userController.authenticate); // doesn't work
router.post("/signin", userController.signinUser, userController.redirectView);


module.exports = router;