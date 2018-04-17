const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [
    {
        name: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe3AoLkBMaWT7bScakASPIWZC9tNqv-L0WtCXC08JAlGcqEHsWjQ",
        description: "aosidhaisdhasdoihasdo"
    },
    {
        name: "Desert Mesa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5msJ8JTcvOiVB6RbN4sNh80Ae0BR_yFlubOlL49apI_-MdK4_g",
        description: "aosidhaisdhasdoihasdo"
    },
    {
        name: "Canyon Floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaAuEyQsUJNuyxT0q96j9vEdgopmG5Hd10imUUfTmzzzy5z9uM",
        description: "aosidhaisdhasdoihasdo"
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("Removed campgrounds!");
    });

    // Add some campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, data){
            if (err) {
                console.log(err);
            } else {
                console.log("Added a campground!");
                // Add some comments
                Comment.create(
                    {
                        text: "This is a comment",
                        author: "John Doe"
                    }, function(err, comment){
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment)
                            campground.save();
                            console.log("Created new comment!");
                        }
                    });
            }
        });
    });
};

module.exports = seedDB;

