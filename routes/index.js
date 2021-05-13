const router = require("express").Router(),
apiRoutes = require("./apiRoutes"),
errorRoutes = require("./errorRoutes"),
homeRoutes = require("./homeRoutes"),
postsRoutes = require("./postsRoutes"),
userRoutes = require("./usersRoutes");


//define name spaces
router.use("/posts", postsRoutes);
router.use("/users", userRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;