var mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express(),
    flash       = require("connect-flash"),
    bodyParser  = require("body-parser"),
  //  passport    = require("passport"),
  //  LocalStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    moment = require('moment'),
   

    path          = require("path"),
    Memory = require("./models/memory"),
    Comment     = require("./models/comment"),
    
    //User        = require("./models/user"),
    seedDB      = require("./seeds"),
    port        = process.env.PORT || 3000;  
//requring routes
var commentRoutes    = require("./routes/comments"),
    storiesRoutes = require("./routes/stories"),
    imagesRoutes   = require("./routes/images"),
    //musicRoutes   = require("./routes/music"),
    indexRoutes      = require("./routes/index"),
    aboutRoutes   = require("./routes/aboutRoutes")
    soundRoutes   = require("./routes/sounds")
    
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/haim_app", { useNewUrlParser: true });
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.locals.moment = require('moment');
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false

}));
require('dotenv').config();

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// app.use(function(req, res, next){
//    res.locals.currentUser = req.user;
//    res.locals.error = req.flash("error");
//    res.locals.success = req.flash("success");

//    next();
// });

app.use("/", indexRoutes);
app.use("/stories/", storiesRoutes);
app.use("/:categories/:id/comments/",commentRoutes);
app.use("/about/", aboutRoutes);
app.use("/images/", imagesRoutes);
app.use("/sounds/", soundRoutes);



app.listen(port, () => console.log(`app listening on port ${port}!`))
