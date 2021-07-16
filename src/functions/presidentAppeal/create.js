const presidentAppealModel = require('../../models/presidentAppeal/presidentAppeal');
const status_codes = require('../../utils/status_codes');

const createPresidentAppeal = async (req, res) => {
	presidentAppealModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully documented appeal application to president'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createPresidentAppeal;
