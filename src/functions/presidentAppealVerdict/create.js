const presidentAppealVerdictModel = require('../../models/presidentAppealVerdict/presidentAppealVerdict');
const status_codes = require('../../utils/status_codes');

const createPresidentAppealVerdict = async (req, res) => {
	presidentAppealVerdictModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully documented appeal verdict from president'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createPresidentAppealVerdict;
