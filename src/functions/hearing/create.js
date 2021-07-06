const hearingModel = require('../../models/hearing/hearing');
const status_codes = require('../../utils/status_codes');

const createHearing = async (req, res) => {
	hearingModel
		.create({
			case: req.body.case,
			date: req.body.date,
			description: req.body.description
		})
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully documented hearing'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createHearing;
