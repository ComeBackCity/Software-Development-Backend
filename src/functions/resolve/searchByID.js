const resolveModel = require('../../models/resolve/resolve');
const status_codes = require('../../utils/status_codes');

const resolveByID = async (req, res) => {
	resolveModel
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

module.exports = resolveByID;
