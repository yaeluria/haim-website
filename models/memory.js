var mongoose = require("mongoose");
var Comment = require
var memorySchema = new mongoose.Schema({
  // name: String,
   image: String,
   content: String,
   author: String,
   category: String,
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

module.exports = mongoose.model("Memory", memorySchema);