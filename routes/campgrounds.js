const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

function isLoggedIn(req, res, next){  // Logged in middleware
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// INDEX ROUTE (shows all campgrounds)
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

// NEW ROUTE (shows form to input a new campground)
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

// CREATE ROUTE (adds new campground to db, and redirects to index route)
router.post("/", isLoggedIn, function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {name: name, image: image, description: desc, author:author}
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW ROUTE (shows more info about a selected campground)
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT ROUTE (Shows form to edit specific campground)
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});

// UPDATE ROUTE (Will update specific campground with data from EDIT and redirect back to SHOW)
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY ROUTE (Delete a campground and redirect back to show)
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;