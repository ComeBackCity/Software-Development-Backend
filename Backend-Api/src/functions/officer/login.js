const officerModel = require('../../models/officer')
const status_codes = require('../../utils/status_codes')

const login = async (req, res) => {
    const officer = await officerModel.findOne({
        badge_no: req.body.badge_no,
        password: req.body.password
    })

    if(!officer) {
        return res.status(status_codes.DATA_NOT_FOUND).json({
            error: "Wrong credentials"
        })
    }

    return res.status(status_codes.SUCCESS).json({
        message: "Successful login",
        officer: {
            name: officer.name,
            rank: officer.rank,
            badge_no: officer.badge_no
        }
    })
}

module.exports = login
