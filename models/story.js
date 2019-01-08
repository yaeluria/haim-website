var mongoose = require("mongoose");

var storySchema = new mongoose.Schema({

   image: String,
   storyText: String,
   author: String,

   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
   
},
{
   timestamps: true
});

module.exports = mongoose.model("Story", storySchema);