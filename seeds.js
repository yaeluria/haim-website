var mongoose = require("mongoose");
var Story= require("./models/story");
var Comment   = require("./models/comment");

var data = [
    {
        author: "משה", 
        image: "https://images.unsplash.com/photo-1522249210728-7cd95094022a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e62da5122b26c591fa4383f622fd370&auto=format&fit=crop&w=400&q=60",
        description: "מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי. "
    },
    {
       author: "שמואל",  
       image: "https://images.unsplash.com/photo-1512733596533-7b00ccf8ebaf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be657403fff56401192a7042f6f87fce&auto=format&fit=crop&w=400&q=60",
       storyText: "מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי. "
    },
    {
        name: "Canyon Floor", 
        image: "https://images.unsplash.com/photo-1479118013749-9f79d55a28d0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4b5e1eb5ba822dbe2dc8979e84f1d17a&auto=format&fit=crop&w=400&q=60",
      storyText: "מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך. קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי. "
    }
]

function seedDB(){
   //Remove all campgrounds
   Story.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed stories!");
         //add a few campgrounds
        data.forEach(function(seed){
          Story.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a story");
                    //create a comment
                   Comment.create(
                        {
                            text: "בלה בלה בלה",
                            author: "שרון"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                             story.comments.push(comment);
                             story.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
