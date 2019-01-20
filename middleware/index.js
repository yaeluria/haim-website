
// var fs = require("fs");
// if (!fs.existsSync("../middleware/definitions")) {
//     console.log("You need to define your own definitions file: middleware/definitions.js  " +
//         "Take a look at middleware/definitions.example.js");
//     process.exit(1);
// }

var Definitions = require("../middleware/definitions");

// all the middleare goes here
var middlewareObj = {};

var multer = require('multer');
require('dotenv').config();

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
middlewareObj.upload = multer({ storage: storage, fileFilter: imageFilter});

middlewareObj.cloudinary = require('cloudinary');

middlewareObj.cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// middlewareObj.convertYoutube(input) = function(req,res,next){
//   var pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;
//   if (pattern.test(input)) {
//     var replacement = '<iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';
//     var input = input.replace(pattern, replacement);
//     // For start time, turn get param & into ?
//     var input = input.replace('&amp;t=', '?t=');
//   }
//   return input;
  
// }

// middlewareObj.checkCampgroundOwnership = function(req, res, next) {
//  if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//            if(err){
//                req.flash("error", "Campground not found");
//                res.redirect("back");
//            }  else {
//                // does user own the campground?
//             if(foundCampground.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 req.flash("error", "You don't have permission to do that");
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("back");
//     }
// }

// middlewareObj.checkCommentOwnership = function(req, res, next) {
//  if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//            if(err){
//                res.redirect("back");
//            }  else {
//                // does user own the comment?
//             if(foundComment.author.id.equals(req.user._id)) {
//                 next();
//             } else {
//                 req.flash("error", "You don't have permission to do that");
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("back");
//     }
// }

// middlewareObj.isLoggedIn = function(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You need to be logged in to do that");
//     res.redirect("/login");
// }

module.exports = middlewareObj;