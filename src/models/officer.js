const mongoose = require('../utils/database/database')

const officer = mongoose.model('Officer', {
    badge_no: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    rank: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = officer
