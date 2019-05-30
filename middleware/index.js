

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

middlewareObj.send =  require("gmail-send")({
  user: process.env.SEND_USER,
  pass: process.env.SEND_PASS,
  to: "yaeluria@gmail.com",
  subject: 'new item added to database',
  text:    'an email from gmail-send'
})



module.exports = middlewareObj;