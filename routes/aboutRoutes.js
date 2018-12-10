var express = require("express");
var router  = express.Router();

var Comment = require("../models/comment");
//var About = require("../models/about");

router.get("/", function(req,res){
    res.render("about");
})


// router.get("/", function(req, res){
    
//     //Get all comments from DB
//    Comment.find({}, function(err, allComments){
//        if(err){
//            console.log(err);
//        } else {
//           res.render("about",{comments:allComments});
//        }
//     });
// });

//    router.get("/comments/new", function(req, res){
    
  
//              res.render("comments/new");
//    });
 
// router.get("/", function(req, res){
//     // Get all stories from DB
//    About.find({}, function(err, allComments){
//        if(err){
//            console.log(err);
//        } else {
//           res.render("about",{comments:allComments});
//        }
//     });
// });



// router.post("/comments",function(req, res){
//     //  var comment = req.body.comment;
//   // var newComment = {comment: comment}
  
//         Comment.create(req.body.comment, function(err, comment){
//            if(err){
//                //req.flash("error", "Something went wrong");
//                console.log(err);
//            } else {
               
               
//                //save comment
//                comment.save();
//               comments.push(comment._id);
              
//                console.log(comment);
//                //req.flash("success", "Successfully added comment");
//               // res.redirect("/about");
//                res.redirect("/about");
//            }
       
       
//    });
//    console.log(req.body.comment);
// });
  

// show register form
// router.get("/register", function(req, res){
//    res.render("register"); 
// });

// //handle sign up logic
// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             req.flash("error", err.message);
//             return res.render("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//            req.flash("success", "Welcome to YelpCamp " + user.username);
//            res.redirect("/campgrounds"); 
//         });
//     });
// });

// //show login form
// router.get("/login", function(req, res){
//    res.render("login"); 
// });

// //handling login logic
// router.post("/login", passport.authenticate("local", 
//     {
//         successRedirect: "/campgrounds",
//         failureRedirect: "/login"
//     }), function(req, res){
// });

// // logout route
// router.get("/logout", function(req, res){
//    req.logout();
//    req.flash("success", "Logged you out!");
//    res.redirect("/campgrounds");
// });



module.exports = router;