const officerModel = require('../../models/officer')
const status_codes = require('../../utils/status_codes')

const new_officer = async (req, res) => {
    let officer = await officerModel.create({
        badge_no: req.body.badge_no,
        name: req.body.name,
        rank: req.body.rank,
        password: req.body.password
    })

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
