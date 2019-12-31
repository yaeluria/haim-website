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

router.post("/", function (req, res) {
    var author = req.sanitize(req.body.author);
        var content = req.sanitize(req.body.content);
        let category = req.body.category;
        let youlink = convertYoutube(req.body.youlink);
        var newSound = {author: author, youlink: youlink, content: content, category: "sound"};
    function convertYoutube(input) {
        var pattern = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(\S+)/g;
        if (pattern.test(input)) {
        var replacement = 'https://www.youtube.com/embed/$1';
        var input = input.replace(pattern, replacement);
        // For start time, turn get param & into ?
        var input = input.replace('&amp;t=', '?t=');
        }

        return input;
        
    }
        
        Memory.create(newSound, function (err, newlyCreated) {
         if (err) {
             console.log(err);
         } else {
            //send myself an email
             middleware.send({subject: 'A new video was added to the website in memory of Haim Tukachinsky',   
             text: `${newlyCreated.youlink} submitted by ${newlyCreated.author}`}, function (err, res) {
                console.log('* from gmail-send() callback returned: err:', err, '; res:', res);
              });
             //redirect back to sounds page
             res.redirect("/sounds");
     
         }
     });
 });



    



//NEW - show form to create new sound
router.get("/new", function(req, res){
   res.render("sounds/new"); 
});





module.exports = router;

