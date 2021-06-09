const mongoose = require('../../utils/database/database')
const thanaModel = require('../misc/thana')
const {Schema} = require("mongoose");

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

    thana: {
        type: Schema.Types.ObjectId,
        ref: 'Thana'
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = officer
