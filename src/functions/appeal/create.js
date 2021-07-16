const appealModel = require('../../models/appeal/appeal');
const status_codes = require('../../utils/status_codes');

const createAppeal = async (req, res) => {
	appealModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully documented appeal application'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createAppeal;
