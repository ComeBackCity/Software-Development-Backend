const officerModel = require('../../models/oficers/officer')
const status_codes = require('../../utils/status_codes')
const mongoose = require('mongoose')

const new_officer = async (req, res) => {

    if(typeof req.body.thana === 'string'){
        req.body.thana = mongoose.Types.ObjectId(req.body.thana)
    }

    let officerData = {
        badge_no: req.body.badge_no,
        name: req.body.name,
        rank: req.body.rank,
        password: req.body.password,
        thana: req.body.thana
    }

    let officer = await officerModel.create(officerData)

    if (officer) {
        return res.status(status_codes.SUCCESS).json({
            message: "Success",
            officer: {
                name: officer.name,
                rank: officer.rank,
                badge_no: officer.badge_no
            }
        })
    } else {
        return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
            error: "Something went wrong"
        })
    }
}

module.exports = new_officer
