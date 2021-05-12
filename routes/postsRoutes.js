const router = require("express").Router(),
userPostController =  require("../controllers/userPostsController");

router.post("/:id/create",  userPostController.create);


module.exports = router;