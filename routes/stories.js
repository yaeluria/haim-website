var express = require("express");
var router  = express.Router();
var Story = require("../models/story");

//var middleware = require("../middleware");


//INDEX - show all stories
router.get("/", function(req, res){
    
    //Get all stories from DB
    Story.find({}, function(err, allStories){
       if(err){
           console.log(err);
       } else {
          res.render("stories/index",{stories:allStories});
       }
    });
});

//CREATE - add new story to DB
router.post("/", function(req, res){
    // get data from form and add to stories array
    var author = req.body.author;
    var image = req.body.image;
    var storyText = req.body.storyText;
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username
    // }
    var newStory = {author: author, image: image, storyText: storyText};
    // Create a new story and save to DB
    Story.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to stories page
            console.log(newlyCreated);
            res.redirect("/stories");
        }
    });
});

//NEW - show form to create new story
router.get("/new", function(req, res){
   res.render("stories/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the story with provided ID
    Story.findById(req.params.id).populate("comments").exec(function(err, foundStory){
        if(err){
            console.log(err);
        } else {
            console.log(foundStory)
            //render show template with that story
            res.render("stories/show", {story: foundStory});
        }
    });
});

// // EDIT STORY ROUTE
// router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findById(req.params.id, function(err, foundStory){
//         res.render("stories/edit", {story: foundStory});
//     });
// });

// // UPDATE STORY ROUTE
// router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
//     // find and update the correct campground
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//        if(err){
//            res.redirect("/stories");
//        } else {
//            //redirect somewhere(show page)
//            res.redirect("/stories/" + req.params.id);
//        }
//     });
// });

// // DESTROY STORY ROUTE
// router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
//    Campground.findByIdAndRemove(req.params.id, function(err){
//       if(err){
//           res.redirect("/stories");
//       } else {
//           res.redirect("/stories");
//       }
//    });
// });


module.exports = router;

