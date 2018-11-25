var mongoose = require("mongoose");

var storySchema = new mongoose.Schema({
  // name: String,
   image: String,
   storyText: String,
   author: String,
   // author: [
   //   {
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "User"
   //    }
      
   //    ],
   //    username: String
   // },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Story", storySchema);