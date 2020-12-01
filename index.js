// If in development,
if (process.env.NODE_ENV !== "production") {
    //require the development npm package, dotenv.
    //and load all environment variables stored inside our .env file, which includes our database connection url.
    //the .env file is ignored by github, so it's contents are kept secret from the public.
    require("dotenv").config();
}

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');
var methodOverride = require('method-override');
const journalsRouter = require('./routes/journals.js');
const userRouter = require('./routes/users.js');
const initializePassport = require("./passport-config.js");
var Journal = require('./models/journal');
var User = require('./models/user');


//Connect to database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("mongoose error: ", err);
    }
});

var users = [];

User.find({}, function (err, foundUsers) {
    if (err) {
        console.log("error finding users: ", err);
    } else {
        users = foundUsers;
    }
})

//Give passport two ways to find users
initializePassport(passport,
    //find user by username
    (username) => {
        return users.find((user) => user.username === username);
    },
    //find user by id
    id => users.find(user => user.id === id)
);

//Allows us to render ejs files instead of html files.
//(ejs files are pretty much the same as html files. The only difference is that they are inclusive of javascript.)
app.set("view-engine", "ejs");

//express setup
app.use(express.static(__dirname + '/public')); //Tells our app to look inside the public directory for files, like our images.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/journals', journalsRouter);   // Make sure this is on the bottom of app.use section
app.use('/users', userRouter);   // Make sure this is on the bottom of app.use section

//ROUTES

//root route
app.get('/', (req, res) => {
    res.render("home.ejs");
})

//contact route
app.get('/contact', (req, res) => {
    res.render("contact.ejs");
})

//about route
app.get('/about', (req, res) => {
    res.render("about.ejs");
})

app.get('/mood/:userMood', (req, res) => {
    var mood = req.params.userMood;
    res.render("healing/index.ejs", { mood: mood });
})

app.get('/healing/:healing_method/:userMood?', (req, res) => {
    var mood = req.params.userMood;
    var healing_method = req.params.healing_method;
    switch (healing_method) {
        case "music":
            res.render('healing/music.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "video":
            res.render('healing/video.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "help":
            res.render('healing/help.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "workout":
            res.render('healing/workout.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "funny":
            res.render('healing/funny.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "quote":
            res.render('healing/quote.ejs', { mood: mood, healing_method: healing_method });
            break;
        default:
            console.log("unrecognized healing method: " + healing_method);
            res.render('home.ejs');
    }
})



//Server starts here with a port of 3000
app.listen(3000);