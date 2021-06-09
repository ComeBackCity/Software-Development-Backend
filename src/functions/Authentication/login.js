const userModel = require('../../models/public/user')
const userTokenModel = require('../../models/public/userToken')
const status_codes = require('../../utils/status_codes')
const {generateToken} = require('../../utils/token/token')

const login = async (req, res) => {
    const user = await userModel.findOne({
        nid: req.body.nid,
        password: req.body.password
    })

    if (!user) {
        return res.status(status_codes.DATA_NOT_FOUND).json({
            error: "Wrong credentials"
        })
    }

    user.password = undefined

    await userTokenModel.deleteMany({
        user_nid: user.nid
    }, function (error) {
        if (error) {
            return res.status(status_codes.INTERNAL_SERVER_ERROR)
                .json("Something went wrong")
        }
    })

    const payload = {
        user_nid: user.nid,
        time: new Date()
    }

    const token = generateToken(payload)

    const new_token = await userTokenModel.create(payload)

    if (new_token) {
        return res.status(status_codes.SUCCESS).json({
            message: "Successful login",
            user,
            token
        })
    } else {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            error: "Error while processing request",
        })
    }
}

module.exports = login
