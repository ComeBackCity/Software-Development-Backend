const gdModel  = require('../../models/gd')
const status_codes = require('../../utils/status_codes')

const new_GD = async (req, res) => {
    let newGD = await gdModel.create({
        topic: req.body.topic,
        title: req.body.title,
        description: req.body.description,
        reportedBy: req.body.reportedBy,
        reportedFor: req.body.reportedFor,
        date: new Date(),
        recordedBy: req.officer.badge_no,
        documents: req.body.documents,
        images: req.body.images
    })

    if (newGD){
        return res.status(status_codes.SUCCESS)
            .json({
                message: "GD documented successfully"
            })
    }
    else {
        return res.status(status_codes.INTERNAL_SERVER_ERROR)
            .json({
                message: "Could not create GD. Something went wrong"
            })
    }

}

module.exports = new_GD
