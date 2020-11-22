const mongoose = require('mongoose');
const journalSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    heading: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
    // the following code shoud be uncommented when users are implemented.
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
})

module.exports = mongoose.model("Journal", journalSchema)
