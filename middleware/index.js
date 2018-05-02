const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middlewareObject = {};

middlewareObject.isLoggedIn = function(req, res, next){ 
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

middlewareObject.checkCampgroundOwnership = function(req, res, next){
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err) {
                    res.redirect("back");
                } else {
                    // Does user own the campground?
                    if (foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            })
        } else {
            res.redirect("back");
        }
    };

middlewareObject.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
                // Does user own the campground?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObject;