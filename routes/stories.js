var express = require("express");
var router  = express.Router();
var Memory = require("../models/memory");

//var middleware = require("../middleware");


//INDEX - show all stories
router.get("/", function(req, res){
    
    //Get all stories from DB
    Memory.find({category:"story"}, function(err, allStories){
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
    var content = req.body.content;
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username
    // }
    let category = req.body.category;
    var newStory = {author: author, image: image, content: content, category: "story"};
    // Create a new story and save to DB
   Memory.create(newStory, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log("newlyCreated");
            console.log(newlyCreated);
            //redirect back to stories page
           // console.log(newlyCreated);
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
    console.log("req.params.id");
    console.log(req.params.id);
    Memory.findOne({ _id: req.params.id }).populate("comments").exec(function(err, foundStory){
        if(err){ ("this is the error");
          console.log(err);
        } else {
           console.log("this is the foundStory.comments");
           console.log(foundStory.comments);

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

