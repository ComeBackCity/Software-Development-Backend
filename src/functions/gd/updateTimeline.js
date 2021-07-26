const gdModel = require('../../models/gd/gd');
const status_codes = require('../../utils/status_codes');

const updateTimeline = async (req, res) => {
	gdModel
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
				message: 'Successfully updated the timeline of the gd'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = updateTimeline;
