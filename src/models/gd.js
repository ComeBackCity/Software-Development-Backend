const mongoose = require('../utils/database/database')

const gd = mongoose.model('General Diary',{
    topic: {
        type: String,
        required: true
    },

    title:{
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    },

    reportedBy: {
        type: String,
        required: true
    },

    reportedFor: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    recordedBy: {
        type: String,
        required: true
    },

    resolved: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports = gd
