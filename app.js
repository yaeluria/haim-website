var mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express(),
    flash       = require("connect-flash"),
    bodyParser  = require("body-parser"),
    methodOverride= require("method-override"),
    moment = require('moment'),
    expressSanitizer = require('express-sanitizer'),

    path          = require("path"),
    Memory = require("./models/memory"),
    Comment     = require("./models/comment"),
    
   // seedDB      = require("./seeds"),
    port        = process.env.PORT || 3000;  
//requring routes
var commentRoutes    = require("./routes/comments"),
    storiesRoutes = require("./routes/stories"),
    imagesRoutes   = require("./routes/images"),
    indexRoutes      = require("./routes/index"),
    aboutRoutes   = require("./routes/aboutRoutes")
    soundRoutes   = require("./routes/sounds")
    
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/haim_app", { useNewUrlParser: true, useFindAndModify: false });
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//app.use(flash());
//seedDB();
app.use(expressSanitizer());

app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "Once again Rusty wins cutest dog!",
//     resave: false,
//     saveUninitialized: false

// }));
require('dotenv').config();


app.use("/", indexRoutes);
app.use("/stories/", storiesRoutes);
app.use("/:categories/:id/comments/",commentRoutes);
app.use("/about/", aboutRoutes);
app.use("/images/", imagesRoutes);
app.use("/sounds/", soundRoutes);



app.listen(port, () => console.log(`app listening on port ${port}!`))
