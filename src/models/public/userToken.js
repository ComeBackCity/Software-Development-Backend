const mongoose = require('../../utils/database/database')

const userToken = mongoose.model('User Token',{
    user_nid: {
        type: String,
        required: true,
        unique: true
    },

    time: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = userToken
