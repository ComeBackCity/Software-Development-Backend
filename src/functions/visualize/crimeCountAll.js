const caseModel = require('../../models/cases/case');
const status_codes = require('../../utils/status_codes');

const crimeCountAll = async (req, res) => {
	caseModel
		.aggregate([
			{
				$lookup: {
					from: 'thanas',
					localField: 'thana',
					foreignField: '_id',
					as: 'thana'
				}
			},
			{
				$unwind: '$thana'
			},
			{
				$group: {
					_id: '$thana.division',
					count: {
						$sum: 1
					}
				}
			}
		])
		.then(r => {
			return res.status(status_codes.SUCCESS).json(r);
		})
		.catch(err => {
			return res.status(status_codes.DATA_NOT_FOUND).json({
				error: err.message
			});
		});
};

module.exports = crimeCountAll;
