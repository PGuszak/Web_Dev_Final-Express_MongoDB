const router = require("express").Router(),
errorController = require("../controllers/errorController");

//error pages go to errorControler.js for the renders
router.use(errorController.internalServererror); //there is a server error
router.use(errorController.pageNotFoundError); //the page is not found/exists

module.exports = router;