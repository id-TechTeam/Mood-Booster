const express = require("express");
const User = require("../models/user.js");
const Journal = require("./../models/journal.js");
const router = express.Router();    //this allows us to create and manage routes without running a whole seperate server. Basically, express.Router() allows us to extend from our app.

//journal index
router.get('/', checkAuthenticated, async (req, res) => {
    const journals = await Journal.find({ owner: req.user._id });
    var user = req.user;
    user.isSignedIn = true;
    delete user.password;
    res.render('journal/index.ejs', { journals: journals, user: user });
})

//new journal
router.get('/new', checkAuthenticated, (req, res) => {
    var user = req.user;
    user.isSignedIn = true;
    delete user.password;
    res.render('journal/new.ejs', { journal: new Journal(), user: user });
})

//create journal
router.post('/', checkAuthenticated, async (req, res, next) => {
    req.journal = new Journal();
    next();
}, saveJournalAndRedirect('new.ejs'))


//edit journal
router.get("/edit/:id", checkAuthenticated, async (req, res) => {
    if (req.params.id.length === 24) {
        try {
            var user = req.user;
            user.isSignedIn = true;
            delete user.password;
            const journal = await Journal.findById(req.params.id);
            journal.createdAt = (journal.createdAt).toLocaleDateString();
            res.render('journal/edit.ejs', { journal: journal, user: user });
        } catch (err) {
            console.log(err);
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
})

//show journal for reading
router.get("/:id", checkAuthenticated, async (req, res) => {
    if (req.params.id.length === 24) {
        try {
            var user = req.user;
            user.isSignedIn = true;
            delete user.password;
            const journal = await Journal.findById(req.params.id);
            if (journal == null) res.redirect('/');
            res.render("journal/show.ejs", { journal: journal, user: user })
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    } else {
        res.redirect("/");
    }
})

//update journal
router.put('/:id', checkAuthenticated, async (req, res, next) => {
    req.journal = await Journal.findById(req.params.id)
    next();
}, saveJournalAndRedirect('edit.ejs'))

//delete journal
router.delete('/:id', checkAuthenticated, async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id);
    res.redirect("/journals");
})


function saveJournalAndRedirect(path) {
    return async (req, res) => {
        let journal = req.journal;
        journal.content = req.body.content;
        journal.heading = req.body.heading;
        journal.owner = req.user;
        var Date_From_Form = new Date(req.body.createdAt);
        var tzOffset = req.body.timezoneDifference;
        var newDate = new Date(Date_From_Form.getTime() + tzOffset * 60 * 1000);
        journal.createdAt = newDate;
        try {
            journal = await journal.save();
            res.redirect(`/journals/${journal._id}`)
        } catch (err) {
            var user = req.user;
            user.isSignedIn = true;
            delete user.password;
            console.log(err);
            res.render(`journal/${path}`, { journal: journal, user: user })
        }
    }
}

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