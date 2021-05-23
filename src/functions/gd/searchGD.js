const gdModel = require('../../models/gd')
const status_codes = require('../../utils/status_codes')

const searchGD = async (req, res) => {
    let gds = []
    if (req.body.title) {
        const titleRegex = new RegExp('^' + req.body.title)
        gds = await gdModel.find({
            title: {
                $regex: titleRegex
            }
        })
    }

    if (gds) {
        return res.status(status_codes.SUCCESS).json({
            gds
        })
    } else {
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            error: "Error while processing request"
        })
    }
}

module.exports = searchGD