var express = require("express");
var router  = express.Router();
var Memory = require("../models/memory");


var Comment = require("../models/comment");
var About = new Memory({category: "about"});


router.get("/", function(req,res){


About.save(function(err){
    if (err) {
        console.log(err);
    } else {
        Memory.findOne({ category: "about" }).populate("comments").exec(function(err, foundStory){
            if(err){ ("this is the error");
              console.log(err);
            } else {
               console.log("this is the foundStory.comments");
               console.log(foundStory.comments);
    
                //render show template with that story
               // res.render("stories/show", {story: foundStory});
               res.render("about/about", {about: foundStory});
          
            }
        
    })
}
})
});
  

router.get("/comments/new", function(req, res){
    
  
             res.render("about/newComment");
   });

router.post("/comments", function (req, res) {
    var newComment = req.body.comment;
    console.log('got post');
    Comment.create(newComment, function (err, comment) {
        if (err) {
            // req.flash("error", "Something went wrong");
            console.log(err);
        } else {
            //save comment
            comment.save(function (err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("comment");
                    console.log(comment);
                    // let commentId = comment._id;
                    //  [your_mongodb_model].query({ _id: mongoose.Types.ObjectId(id) });
                   // console.log("req.params.id");
                   // console.log(req.params.id);
                   Memory.findOne({ category: "about" }, function (err,about) {
                   about.comments.push(comment._id);
                   about.save(function (err, memory) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                                res.redirect("/about");
                
                        }
                    
    
                     });
        
    });
};
});
}
    });
});

   








module.exports = router;