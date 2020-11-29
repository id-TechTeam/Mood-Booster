const express = require("express");
const User = require("./../models/user.js");
const passport = require("passport");
const bcrypt = require('bcrypt');
const router = express.Router();    //this allows us to create and manage routes without running a whole seperate server. Basically, express.Router() allows us to extend from our app.


router.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("user/login.ejs");
});


router.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("user/register.ejs");
});

router.post(
    "/login", checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "/journals",
        failureRedirect: "/users/login",
        failureFlash: true,
    })
);


// bcrypt.hash() is an async function, so the callback needs to be async. We also need to await for the password to hash before we save it.
router.post("/register", checkNotAuthenticated, async (req, res) => {
    // 10 is generally a fast, but also safe setting for hashing a password using bcrypt

    function hasUpperCase(str) {
        if (str.toLowerCase() != str) {
            return true
        } else {
            throw 'Needs at least one lowercase letter'
        }
    }
    function hasLowerCase(str) {
        if (str.toUpperCase() != str) {
            return true
        } else {
            throw 'Needs at least one uppercase letter'
        }
    }
    function hasNumber(myString) {
        if (/\d/.test(myString)) {
            return true
        } else {
            throw 'Needs at least one number'
        }
    }
    function isLong(myString) {
        if (myString.length >= 8) {
            return true
        } else {
            throw 'Needs a minimum length of 8'
        }
    }
    try {
        isLong(req.body.password);
        console.log("length");
        hasUpperCase(req.body.password);
        console.log("uppercase");
        hasLowerCase(req.body.password);
        console.log("lowercase");
        hasNumber(req.body.password);
        console.log("number");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        var newUser = {
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword,
        };
        User.create(newUser, function (err, createdUser) {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local", {
                    successRedirect: "/journals",
                    failureRedirect: "/users/register",
                    failureFlash: true,
                })
            }
        })
    } catch (e) {
        res.render("user/register.ejs", { messages: { error: e } });
    }
});


router.delete("/logout", checkAuthenticated, (req, res) => {
    req.logout();
    res.redirect("/");
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/users/login");
    }
}


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/journals");
    } else {
        return next();
    }
}

//tells our app to use this router
module.exports = router;