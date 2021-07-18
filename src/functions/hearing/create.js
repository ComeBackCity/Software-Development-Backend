const hearingModel = require('../../models/hearing/hearing');
const status_codes = require('../../utils/status_codes');

const createHearing = async (req, res) => {
	hearingModel
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

module.exports = createHearing;
