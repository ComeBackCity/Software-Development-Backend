const caseModel = require('../../models/cases/case')
const status_codes = require('../../utils/status_codes')

const searchCase = async (req, res) => {
    let queryPayload = {}

    if (req.query.subject) {
        let subjectRegex = new RegExp('.*?')
        if (req.query.subject) {
            subjectRegex = new RegExp('^' + req.query.subject)
        }
        console.log(subjectRegex)
        queryPayload.subject = {
            $regex: subjectRegex
        }

    }

    if (req.query.type){
        queryPayload.type = req.query.type
    }

    if (req.query.assigned_officers) {
        queryPayload.assigned_officers = {
            $in: req.query.assigned_officers
        }
    }

    caseModel.find(queryPayload)
        .then(cases => {
            return res.status(status_codes.SUCCESS)
                .json(cases)
        })
        .catch(err => {
            return res.status(status_codes.DATA_NOT_FOUND)
                .json({
                    error: err.message
                })
        })
}

module.exports = searchCase
