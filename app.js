const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground"); // Campground Schema
const seedDB = require("./seeds"); 

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES ============================================
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX ROUTE (shows all campgrounds)
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

// NEW ROUTE (shows form to input a new campground)
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// CREATE ROUTE (adds new campground to db, and redirects to index route)
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW ROUTE (shows more info about a selected campground)
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

// ====================================================
app.listen(3000, function(){
    console.log("Camp server has started on port 3000!");

});

