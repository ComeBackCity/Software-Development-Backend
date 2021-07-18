const verdictModel = require('../../models/verdict/verdict');
const status_codes = require('../../utils/status_codes');

const verdictByID = async (req, res) => {
	verdictModel
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

module.exports = verdictByID;
