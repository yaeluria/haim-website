var express = require("express");
var router  = express.Router();
var Memory = require("../models/memory");

var middleware = require("../middleware");


//INDEX - show all stories
router.get("/", function(req, res){
    
    //Get all stories from DB
    Memory.find({category:"sound"}, function(err, allSounds){
       if(err){
           console.log(err);
       } else {
        res.render("sounds/index",{sounds:allSounds});
       }
    });
});

// router.post("/", middleware.convertYoutube(), function (req, res) {

//        // if (!image) image = null;
//         var author = req.body.author;
//         var content = req.body.content;
//         let category = req.body.category;
//         let youlink = req.body.youlink;
//         var newSound = {author: author, youlink: youlink, content: content, category: "sound"};
//         // Create a new story and save to DB
//         Memory.create(newSound, function (err, newlyCreated) {
//             if (err) {
//                 console.log(err);
//             } else {

//                 console.log("newlyCreated");
//                 console.log(newlyCreated);
//                 //redirect back to stories page
//                  console.log(newlyCreated);
//                 res.redirect("/sounds");
        
//             }
//         });
//     });

router.post("/", function (req, res) {
    var author = req.body.author;
        var content = req.body.content;
        let category = req.body.category;
        let youlink = convertYoutube(req.body.youlink);
        var newSound = {author: author, youlink: youlink, content: content, category: "sound"};
    function convertYoutube(input) {
        var pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;
        if (pattern.test(input)) {
        var replacement = 'http://www.youtube.com/embed/$1';
        var input = input.replace(pattern, replacement);
        // For start time, turn get param & into ?
        var input = input.replace('&amp;t=', '?t=');
        }
        console.log("this is the input");
        console.log(input);
        return input;
        
    }
        
        Memory.create(newSound, function (err, newlyCreated) {
            console.log(youlink);
         if (err) {
             console.log(err);
         } else {

             console.log("newlyCreated");
             console.log(newlyCreated);
             //redirect back to stories page
              
              console.log()
             res.redirect("/sounds");
     
         }
     });
 });



    
//     let path = req.file ? req.file.path : '';
//     if (path) {
//         middleware.cloudinary.uploader.upload(path, function (result) {
//             var image = result.secure_url || null;
//             createMemory(image);
//         });
//     }
//     else {
//         createMemory(null);
//     }
// });


//NEW - show form to create new story
router.get("/new", function(req, res){
   res.render("sounds/new"); 
});

// // SHOW - shows more info about one campground
// router.get("/:id", function(req, res){
//     //find the story with provided ID
//     console.log("req.params.id");
//     console.log(req.params.id);
//     Memory.findOne({ _id: req.params.id }).populate("comments").exec(function(err, foundStory){
//         if(err){ ("this is the error");
//           console.log(err);
//         } else {
//            console.log("this is the foundStory.comments");
//            console.log(foundStory.comments);

//             //render show template with that story
//            // res.render("stories/show", {story: foundStory});
//            res.render("images/show", {image: foundStory});
      
//         }
//     });
// });




module.exports = router;

