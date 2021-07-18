const caseModel = require('../../models/cases/case');
const status_codes = require('../../utils/status_codes');

const updateTimeline = async (req, res) => {
	caseModel
		.findOneAndUpdate(
			{
				_id: req.query._id
			},
			{
				$push: {
					links: req.body.toPush
				}
			},
			{
				useFindAndModify: false
			}
		)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully updated the timeline of the case'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = updateTimeline;
