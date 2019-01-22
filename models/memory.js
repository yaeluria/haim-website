var mongoose = require("mongoose");
var Comment = require
var memorySchema = new mongoose.Schema({
   image: String,
   content: String,
   author: String,
   category: String,
   youlink: String,
 
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

module.exports = mongoose.model("Memory", memorySchema);