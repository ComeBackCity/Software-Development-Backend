const officerModel = require('../../models/oficers/officer')
const status_codes = require('../../utils/status_codes')

const getOfficerList = async (req, res) => {
    await officerModel.find()
        .then(officers => {
            officers.map(officer => {
                officer.password = undefined
            })
            return res.status(status_codes.SUCCESS)
                .json(officers)
        }).catch(err => {
            return res.status(status_codes.DATA_NOT_FOUND)
                .json({
                    error: err.message
                })
        })
}

module.exports = getOfficerList
