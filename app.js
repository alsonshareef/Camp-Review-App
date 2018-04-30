const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");

// MODELS
const Campground = require("./models/campground"); // Campground Schema
const Comment = require("./models/comment"); // Comment Schema
const User = require("./models/user");
const seedDB = require("./seeds"); 

// CONFIG ============================================
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // CSS
app.use(methodOverride("_method"));
// seedDB(); // Undo comment to seed the database

// ROUTES CONFIG
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This is the authentication for review app",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){       // Log-in middleware so every route will display logged in user
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

// ====================================================
app.listen(3000, function(){
    console.log("Camp server has started on port 3000!");
});