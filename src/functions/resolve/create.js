const resolveModel = require('../../models/resolve/resolve');
const status_codes = require('../../utils/status_codes');

const createResolve = async (req, res) => {
	resolveModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				id: r._id,
				message: 'Successfully documented resolution'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createResolve;
