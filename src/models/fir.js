const mongoose = require('../utils/database/database')

const fir = mongoose.model('First Information Report', {
    topic: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
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

    reportedAgainst: {
        type: String
    },

    incidentDate: {
        type: Date,
        required: true
    },

    reportingDate: {
        type: Date,
        required: true,
        default: Date.now
    },

    recordedBy: {
        type: String,
        required: true
    },

    areaOfIncident: {
        type: String
    },

    documents: {
        type: [String],
        default: []
    },

    images: {
        type: [String],
        default: []
    }

})

module.exports = fir
