const firModel = require('../../models/fir')
const status_codes = require('../../utils/status_codes')

const searchFIR = async (req, res) => {
    let firs = []
    if (req.query.title) {
        const titleRegex = new RegExp('^' + req.query.title)
        firs = await firModel.find({
            title: {
                $regex: titleRegex
            }
        })
    }

    if (firs) {
        return res.status(status_codes.SUCCESS).json({
            firs
        })
    } else {
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            error: "Error while processing request"
        })
    }
}

module.exports = searchFIR
