const officerModel = require('../../models/officer')
const officerTokenModel = require('../../models/officerToken')
const status_codes = require('../../utils/status_codes')
const {generateToken} = require('../../utils/token/token')

const login = async (req, res) => {
    const officer = await officerModel.findOne({
        badge_no: req.body.badge_no,
        password: req.body.password
    })

    if (!officer) {
        return res.status(status_codes.DATA_NOT_FOUND).json({
            error: "Wrong credentials"
        })
    }

    await officerTokenModel.deleteMany({
        officer_id: officer._id
    }, function (error) {
        if (error) {
            return res.status(status_codes.INTERNAL_SERVER_ERROR)
                .json("Something went wrong")
        }
    })

    const payload = {
        officer_id: officer._id,
        time: new Date()
    }

    const token = generateToken(payload)

    const new_token = await officerTokenModel.create(payload)

    if (new_token) {
        return res.status(status_codes.SUCCESS).json({
            message: "Successful login",
            officer: {
                name: officer.name,
                rank: officer.rank,
                badge_no: officer.badge_no
            },
            token
        })
    } else {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            error: "Error while processing request",
        })
    }
}

module.exports = login
