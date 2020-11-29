const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    journals: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Journal",
            required: true
        }],
        required: true
    },
})

module.exports = mongoose.model("User", userSchema)