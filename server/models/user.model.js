const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
        maxLength: 10,
    },
    email: {
        type: String,
        default: null
    },
    password: {
        required:true,
        type: String,
    },
    history: [{
        title: {
            type: String,
        },
    }],
})

module.exports = mongoose.model("users", user)