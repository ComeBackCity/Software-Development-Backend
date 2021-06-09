const status_codes = require('../utils/status_codes')
const officerModel = require('../models/oficers/officer')
const {verifyToken} = require('../utils/token/token')

const officer_auth = async (req, res, next) => {
    if (req.headers.authorization) {
        if (!req.headers.authorization.startsWith("Officer ")) {
            return res.status(status_codes.BAD_REQUEST)
                .json({
                    message: "Wrong format"
                })
        }
        const token = req.header("Authorization").replace("Officer ", "");
        verifyToken(token, async (err, data) => {
            if (err) res.status(401).json({error: "jwt expired"});
            else {
                let officer = await officerModel.findOne({
                    _id: data.officer_id
                })

                if (officer) {
                    req.officer = officer;
                    next();
                } else res.status(status_codes.DATA_NOT_FOUND)
                    .json({error: "No such officer found"});
            }
        });
    } else {
        res.status(status_codes.UNAUTHORIZED)
            .json({
                message: "No token sent"
            })
    }
}

module.exports = officer_auth
