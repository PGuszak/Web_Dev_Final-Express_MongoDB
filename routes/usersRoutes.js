const router = require("express").Router(),
userController =  require("../controllers/usersControllers");

//LogOut
router.get("/logout", userController.logout, userController.redirectView);


//HOME
router.get("/:id/home", userController.showHome, userController.showViewHome);


//userPage
router.get("/:id/userPage", userController.showUserPage, userController.showViewUserPage);

//userProjects
router.get("/:id/projects", userController.showProjects, userController.showViewProjects);

//posts
router.get("/:id/posts", userController.showPosts, userController.showViewPosts);


//userFriends
router.get("/:id/friends", userController.showFriends, userController.showViewFriends);


//userEdit
router.get("/:id/edit", userController.edit, userController.showEdit);
router.put("/:id/update", userController.update, userController.redirectView);

//Friends


module.exports = router;

