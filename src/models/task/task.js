const database = require('../../utils/database/database')
const {Schema} = require("mongoose");

const task = database.model('Task',{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    location: {
        type: String,
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    assigned_officers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Officer'
        }],
        required: true,
        validate: [(val) => {
            return val.length > 0
        }, 'Minimum 1 officer is required']
    },

    status: {
        type: String,
        required: true,
        enum: [
            'completed',
            'not started yet',
            'finished'
        ],
        default: 'not started yet'
    }
})

module.exports = task
