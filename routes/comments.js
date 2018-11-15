var express = require("express");
var router  = express.Router({mergeParams: true});
var Story = require("../models/story");
var Comment = require("../models/comment");

//comments new
 router.get("/about/newcomment", function(req,res){
  res.render("comments/new");

 });





//Comments Create
router.post("/about",function(req, res){
	   var comment = req.body.comment;
  
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               //req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               
               
               //save comment
               comment.save();
               comments.push(comment);
              
               console.log(comment);
               //req.flash("success", "Successfully added comment");
               res.redirect("/about", {comment: comment});
           }
       
       
   });
});

// // COMMENT EDIT ROUTE
// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//    Comment.findById(req.params.comment_id, function(err, foundComment){
//       if(err){
//           res.redirect("back");
//       } else {
//         res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
//       }
//    });
// });

// // COMMENT UPDATE
// router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//       if(err){
//           res.redirect("back");
//       } else {
//           res.redirect("/campgrounds/" + req.params.id );
//       }
//    });
// });

// // COMMENT DESTROY ROUTE
// router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     //findByIdAndRemove
//     Comment.findByIdAndRemove(req.params.comment_id, function(err){
//        if(err){
//            res.redirect("back");
//        } else {
//            req.flash("success", "Comment deleted");
//            res.redirect("/campgrounds/" + req.params.id);
//        }
//     });
// });

module.exports = router;