const router = require("express").Router(),
apiRoutes = require("./apiRoutes"),
errorRoutes = require("./errorRoutes"),
homeRoutes = require("./homeRoutes"),
userRoutes = require("./userRoutes"),
signInRoutes = require("./signipRoutes"),
signUpRoutes = require("./signUpRoutes")

//define name spoces
router.use("signUpRoutes", signUpRoutes);
router.use("signInRoutes", signInRoutes);
router.use("/users", userRoutes);
router.use("/home", homeRoutes);
router.use("/api", apiRoutes);
router.use("/", errorRoutes);

module.exports = router;
