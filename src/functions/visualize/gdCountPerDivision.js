const gdModel = require('../../models/gd/gd');
const thanaModel = require('../../models/misc/thana');
const status_codes = require('../../utils/status_codes');

const gdCountPerDivision = async (req, res) => {
	let thanaIDs = [],
		gds = [];

	await thanaModel
		.find({
			division: req.query.division
		})
		.distinct('_id')
		.then(r => {
			thanaIDs = r;
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				error: err.message
			});
		});

	await gdModel
		.aggregate([
			{
				$match: {
					thana: {
						$in: thanaIDs
					}
				}
			},
			{
				$group: {
					_id: '$topic',
					count: {
						$sum: 1
					}
				}
			}
		])
		.then(data => {
			return res.status(status_codes.SUCCESS).json(data);
		})
		.catch(err => {
			console.log(err);
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				error: err.message
			});
		});
};

module.exports = gdCountPerDivision;
