const presidentAppealVerdictModel = require('../../models/presidentAppealVerdict/presidentAppealVerdict');
const status_codes = require('../../utils/status_codes');

const presidentAppealVerdictByID = async (req, res) => {
	presidentAppealVerdictModel
		.findById(req.query._id)
		.then(r => {
			return res.status(status_codes.SUCCESS).json(r);
		})
		.catch(err => {
			return res.status(status_codes.DATA_NOT_FOUND).json({
				error: err.message
			});
		});
};

module.exports = presidentAppealVerdictByID;
