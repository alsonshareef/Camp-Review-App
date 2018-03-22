var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Lane Poole Reserve", image:"https://pixabay.com/get/ea34b00e21f6003ed1584d05fb1d4e97e07ee3d21cac104497f1c77aa4edb0ba_340.jpg"},
    {name: "Yalgorup National Park", image:"https://farm8.staticflickr.com/7296/28070862692_32f82c02ba.jpg"},
    {name: "Wellington National Park", image:"https://pixabay.com/get/ea35b8062cf1063ed1584d05fb1d4e97e07ee3d21cac104497f1c77da7e9b4bb_340.jpg"},
    {name: "Lane Poole Reserve", image:"https://pixabay.com/get/ea34b00e21f6003ed1584d05fb1d4e97e07ee3d21cac104497f1c77aa4edb0ba_340.jpg"},
    {name: "Yalgorup National Park", image:"https://farm8.staticflickr.com/7296/28070862692_32f82c02ba.jpg"},
    {name: "Wellington National Park", image:"https://pixabay.com/get/ea35b8062cf1063ed1584d05fb1d4e97e07ee3d21cac104497f1c77da7e9b4bb_340.jpg"},
    {name: "Lane Poole Reserve", image:"https://pixabay.com/get/ea34b00e21f6003ed1584d05fb1d4e97e07ee3d21cac104497f1c77aa4edb0ba_340.jpg"},
    {name: "Yalgorup National Park", image:"https://farm8.staticflickr.com/7296/28070862692_32f82c02ba.jpg"},
    {name: "Wellington National Park", image:"https://pixabay.com/get/ea35b8062cf1063ed1584d05fb1d4e97e07ee3d21cac104497f1c77da7e9b4bb_340.jpg"}
]

// ROUTES ============================================
// GET ===============================================
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// POST ===============================================
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

// ====================================================
app.listen(3000, function(){
    console.log("Camp server has started on port 3000!");

});