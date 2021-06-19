const firModel = require('../../models/fir');
const status_codes = require('../../utils/status_codes');

const new_FIR = async (req, res) => {
	let newGD = await firModel.create({
		topic: req.body.topic,
		title: req.body.title,
		description: req.body.description,
		reportedBy: req.body.reportedBy,
		reportedFor: req.body.reportedFor,
		reportedAgainst: req.body.reportedAgainst,
		incidentDate: req.body.incidentDate,
		reportingDate: new Date(),
		recordedBy: req.officer.badge_no,
		documents: req.body.documents,
		images: req.body.images
	});

	if (newGD) {
		return res.status(status_codes.SUCCESS).json({
			message: 'FIR documented successfully'
		});
	} else {
		return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
			message: 'Could not create FIR. Something went wrong'
		});
	}
};

module.exports = new_FIR;
