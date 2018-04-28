const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

function isLoggedIn(req, res, next){  // Logged in middleware
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// New Route
router.get("/new", isLoggedIn, function(req, res){
    // Find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});

// Create Route
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    // Add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    // Add comment to campground and save
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

module.exports = router;