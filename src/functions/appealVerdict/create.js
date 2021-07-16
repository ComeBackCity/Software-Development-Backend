const appealVerdictModel = require('../../models/appealVerdict/appealVerdict');
const status_codes = require('../../utils/status_codes');

const createAppealVerdict = async (req, res) => {
	appealVerdictModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully documented appeal verdict'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createAppealVerdict;
