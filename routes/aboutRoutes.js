var express = require("express");
var router  = express.Router();
var Memory = require("../models/memory");


var Comment = require("../models/comment");
//var About = new Memory({category: "about"});

router.get("/", function(req,res,next){
    var query = {category:"about"},
    //update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
Memory.findOneAndUpdate(query, options, function(error, result) {
    if (error) return;
        // If the document doesn't exist
    if (!result) {
        // Create it
        result = new Memory({category:"about"});
    }
    // Save the document
    result.save(function(error) {
        if (!error) {
            // Do something with the document
           
            Memory.findOne({ category: "about" }).populate("comments").exec(function(err, foundMemory){
                            if(err){ ("this is the error");
                              console.log(err);
                            } else {
                               console.log("this is the foundMemory.comments");
                              if(foundMemory.comments){
                                  console.log(foundMemory.comments);
                                }
                               
                                //render show template with that memory
                               res.render("about/about", {about: foundMemory});
                            }
                        
                    });
               
                }

    
         });
     })
});

  

router.get("/comments/new", function(req, res){
             res.render("about/newComment");
   });

router.post("/comments", function (req, res) {
    var text = req.sanitize(req.body.comment.text);
    var author = req.sanitize(req.body.comment.author);
    var newComment = {text: text, author: author};
    console.log('got post');
    Comment.create(newComment, function (err, comment) {
        if (err) {
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