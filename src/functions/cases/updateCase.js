const caseModel = require('../../models/cases/case');
const status_codes = require('../../utils/status_codes');

const assignOfficer = async (req, res) => {
	caseModel
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
				message: 'Successfully updated the case'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = assignOfficer;
