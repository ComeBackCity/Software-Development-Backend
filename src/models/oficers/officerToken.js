const database = require('../../utils/database/database')
const {Schema} = require("mongoose");

const officerToken = database.model('officerToken', {
    officer_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    time: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = officerToken
