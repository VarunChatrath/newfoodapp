const mongoose = require('mongoose')

const newsLetterSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('newsLetter', newsLetterSchema)