const router = require("express").Router(),
    userPostsController = require("../controllers/userPostsController");



//router.post("/posts/:id/create",  userPostController.create);

router.use(userPostsController.errorJSON);

module.exports = router;