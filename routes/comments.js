var express = require("express");
var mongoose = require("mongoose");

var router = express.Router({ mergeParams: true });
var Memory = require("../models/memory");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", function (req, res) {
    
    // find memory by id

    Memory.findById(req.params.id, function (err, memory) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { active: req.params.categories,
               memory: memory });
        }
    })
});

function saveComment(memory, commentId, res){
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
            
                    Memory.findById(req.params.id, function (err, memory) {
                        if (err) {
                            console.log(err);
                            res.redirect("/stories");
                        }
                        else {
                            saveComment(memory,comment._id,res);
                            middleware.send({ 
                                subject: 'A new comment was posted on the website in memory of Haim Tukachinsky',   
                                text: `${comment.text} submitted by ${comment.author}. commented on ${memory.author}'s ${memory.category}` 
                              }, function (err, res) {
                                console.log('* from gmail-send() callback returned: err:', err, '; res:', res);
                              });
                        }
                    });
                }
            });
        }
    });
});
            


 module.exports = router;