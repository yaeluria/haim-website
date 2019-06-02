var express = require("express");
var router  = express.Router();
var Memory = require("../models/memory");

var middleware = require("../middleware");


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

router.post("/", middleware.upload.single('image'), function (req, res) {
    function createMemory(image) {
       // if (!image) image = null;
        var author = req.sanitize(req.body.author);
        var content = req.sanitize(req.body.content);
        let category = req.body.category;
        var newStory = {author: author, image: image, content: content, category: "story"};
        // Create a new story and save to DB
        Memory.create(newStory, function (err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {

                console.log("newlyCreated");
                console.log(newlyCreated);
                //send myself an email
                middleware.send({  subject: 'A new story was added to the website in memory of Haim Tukachinsky',   
                text: `${newlyCreated.content} submitted by ${newlyCreated.author} image: ${newlyCreated.image}`
                  }, function (err, res) {
                    console.log('* from gmail-send() callback returned: err:', err, '; res:', res);
                  });
                //redirect back to stories page
                // console.log(newlyCreated);
                res.redirect("/stories");
            }
        });
    }
    let path = req.file ? req.file.path : '';
    if (path) {
        middleware.cloudinary.uploader.upload(path, function (result) {
            var image = result.secure_url || null;
            createMemory(image);
        });
    }
    else {
        createMemory(null);
    }
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




module.exports = router;

