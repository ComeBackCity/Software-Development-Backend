const gdModel = require('../../models/gd/gd');
const status_codes = require('../../utils/status_codes');

const assignOfficer = async (req, res) => {
	if (req.officer.rank !== 'Officer in Charge') {
		return res.status(status_codes.UNAUTHORIZED).json({
			message: 'You do not have permission to perform this action'
		});
	}

	gdModel
		.findOneAndUpdate(
			{
				_id: req.query._id
			},
			req.body,
			{
				useFindAndModify: false
			}
		)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully assigned new officers'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = assignOfficer;
