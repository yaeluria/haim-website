var express = require("express");
var mongoose = require("mongoose");

var router = express.Router({ mergeParams: true });
var Memory = require("../models/memory");
var Comment = require("../models/comment");
//var About = require("../models/about");

router.get("/new", function (req, res) {
    
    // find story by id
    console.log(req.params.id);
    console.log(req.params.categories);

    Memory.findById(req.params.id, function (err, memory) {
        if (err) {
            console.log(err);
        } else {
            console.log(memory);
            res.render("comments/new", { categoryPlural: req.params.categories,
               memory: memory });
        }
    })
});

function saveComment(memory, commentId, res){
    console.log('saving comment');
    memory.comments.push(commentId);
    memory.save(function (err, memory) {
    if (err) {
        console.log(err);
    }
    else {
        switch (memory.category) {
            case "story":
                res.redirect("/stories/" + memory._id);
                break;
            case "image":
                res.redirect("/images/" + memory._id);
                break;
            case "sound":
                res.redirect("/sounds/" + memory._id);
                break;
            default:
                res.redirect("/");

        }
    }
});

}

//Comments Create
router.post("/", function (req, res) {
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
                    console.log("req.params.id");
                    console.log(req.params.id);

                    Memory.findById(req.params.id, function (err, memory) {
                        if (err) {
                            console.log(err);
                            res.redirect("/stories");
                        }
                        else {
                            saveComment(memory,comment._id,res);
                        }
                    });
                }
            });
        }
    });
});
            



    // //Comments Create
    // router.post("/",function(req, res){
    //    //lookup story using ID
    //   Story.findById(req.params.id, function(err, story){
    //        if(err){
    //            console.log(err);
    //            res.redirect("/stories");
    //        } else {
    //          var newComment = req.body.comment;
    //         Comment.create(newComment, function(err, comment){
    //            if(err){
    //               // req.flash("error", "Something went wrong");
    //                console.log(err);
    //            } else {
    //                //add username and id to comment
    //                //comment.author.id = req.user._id;
    //              //  comment.author.username = req.user.username;
    //                //save comment
    //                comment.save(function(err,comment){
    //                    console.log(err);
    //                });
    //                console.log("comment");
    //                console.log(comment);
    //                console.log('before');
    //                console.log(story);
    //                story.comments.push(comment._id);
    //                story.save(function(err, story) {
    //                 console.log(err);
    //             })
    //                console.log('after');
    //                console.log(story);
    //              //  req.flash("success", "Successfully added comment");
    //                res.redirect('/stories/' + story._id);
    //            }
    //         });
    //        }
    //    });
    // });

    // // COMMENT EDIT ROUTE
    // router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    //    Comment.findById(req.params.comment_id, function(err, foundComment){
    //       if(err){
    //           res.redirect("back");
    //       } else {
    //         res.render("comments/edit", {story_id: req.params.id, comment: foundComment});
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