"use strict";

const { reset } = require("nodemon");
const Post = require("../models/posts");



module.exports = {

    //Used to call the new post page, not needed since we are now creating a post from the home page.
    new: (req, res) => {
        let userId = req.params.id;
        console.log("PARAMS")
        console.log(userId)


        User.findById(userId)
            .then(user => {
                res.render("posts/new", { user: user });
            })
            .catch(error => {
                console.log(`Error fetching course by ID: ${error.message}`);
                next(error);
            })

    },

    //Used to create a new post then upload it to mongoDB
    create: (req, res, next) => {

        let courseId = req.params.id;
        var userName = ''
        console.log(req.body.currentUser)


        User.findById(courseId)
            .then(user => {
                //console.log(user.Username)
                userName = user.Username

                let newPost = new Post({
                    postingUserID: courseId,
                    caption: req.body.caption,
                    postPicture: '',
                    userName: userName,
                    comments: '',
                    likes: 0,
                });

                Post.create(newPost)
                    .then(post => {
                        res.locals.course = post;
                        res.redirect(`/home/${courseId}`);
                        //res.locals.redirect = `/home/${result._id}`;

                    })
                    .catch(error => {
                        console.log(`Error saving post ${error.message}`)
                        next(error);
                    })

            })
            .catch(error => {
                console.log(`Error fetching course by ID: ${error.message}`);

            })



    },


    //Takes us back to the home page after creating a new post
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    }

}