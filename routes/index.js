var express = require("express");
var router  = express.Router();
//var passport = require("passport");
//var User = require("../models/user");
var Comment = require("../models/comment");
//var About = require("../models/about");

//var commentRoutes = require("./commentRoutes")

//root route
router.get("/", function(req, res){
    res.render("landing");
});




module.exports = router;