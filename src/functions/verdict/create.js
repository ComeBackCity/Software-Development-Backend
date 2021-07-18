const verdictModel = require('../../models/verdict/verdict');
const status_codes = require('../../utils/status_codes');

const createVerdict = async (req, res) => {
	verdictModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				id: r._id,
				message: 'Successfully documented hearing'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createVerdict;
