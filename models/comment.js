var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String

 
},
{
    timestamps: true
});

module.exports = mongoose.model("Comment", commentSchema);