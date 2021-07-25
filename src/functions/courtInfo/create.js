const courtModel = require('../../models/courtInfo/courtInfo');
const status_codes = require('../../utils/status_codes');

const createCourtInfo = async (req, res) => {
	courtModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				id: r._id,
				message: 'Successfully documented court information'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createCourtInfo;
