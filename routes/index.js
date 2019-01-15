var express = require("express");
var router  = express.Router();

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/events", function(req, res){
    res.render("events");
});

router.get("/works", function(req, res){
    res.render("construction", {active: "works"});
});

router.get("/press", function(req, res){
    res.render("construction", {active: "press"});
});


module.exports = router;