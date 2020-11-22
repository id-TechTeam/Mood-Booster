const express = require("express");
const Journal = require("./../models/journal.js");
const router = express.Router();    //this allows us to create and manage routes without running a whole seperate server. Basically, express.Router() allows us to extend from our app.

//journal index
router.get('/', async (req, res) => {
    const journals = await Journal.find({});
    res.render('journal/index.ejs', { journals: journals });
})

//new journal
router.get('/new', (req, res) => {
    res.render('journal/new.ejs', { journal: new Journal() });
})

//create journal
router.post('/', async (req, res, next) => {
    req.journal = new Journal();
    next();
}, saveJournalAndRedirect('new.ejs'))


//edit journal
router.get("/edit/:id", async (req, res) => {
    if (req.params.id.length === 24) {
        try {
            const journal = await Journal.findById(req.params.id);
            res.render('journal/edit.ejs', { journal: journal });
        } catch (err) {
            console.log(err);
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
})

//show journal for reading
router.get("/:id", async (req, res) => {
    if (req.params.id.length === 24) {
        try {
            const journal = await Journal.findById(req.params.id);
            if (journal == null) res.redirect('/');
            res.render("journal/show.ejs", { journal: journal })
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    } else {
        res.redirect("/");
    }
})

//update journal
router.put('/:id', async (req, res, next) => {
    req.journal = await Journal.findById(req.params.id)
    next();
}, saveJournalAndRedirect('edit.ejs'))

//delete journal
router.delete('/:id', async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id);
    res.redirect("/journals");
})


function saveJournalAndRedirect(path) {
    return async (req, res) => {
        let journal = req.journal;
        journal.content = req.body.content;
        journal.heading = req.body.heading;
        try {
            journal = await journal.save();
            res.redirect(`/journals/${journal._id}`)
        } catch (err) {
            console.log(err);
            res.render(`journal/${path}`, { journal: journal })
        }
    }
}

//tells our app to use this router
module.exports = router;