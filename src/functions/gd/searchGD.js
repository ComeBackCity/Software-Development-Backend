const gdModel = require('../../models/gd/gd');
const status_codes = require('../../utils/status_codes');

const searchGD = async (req, res) => {
	let queryPayload = {};

	if (req.officer.rank === 'Officer in Charge') {
		if (req.query.assigned_officers) {
			queryPayload.assigned_officers = {
				$in: req.query.assigned_officers
			};
		}
	} else {
		queryPayload.assigned_officers = {
			$in: req.officer._id
		};
	}

	if (req.query.title) {
		let subjectRegex = new RegExp('.*?');
		if (req.query.title) {
			subjectRegex = new RegExp('^' + req.query.title);
		}

		queryPayload.title = {
			$regex: subjectRegex
		};
	}

	if (req.query.topic) {
		queryPayload.topic = req.query.topic;
	}

	if (req.query.startDate) {
		queryPayload.date = {
			$gte: req.query.startDate,
			$lte: req.query.endDate
		};
	}

	gdModel
		.find(queryPayload)
		.populate('assigned_officers')
		.then(cases => {
			cases.map(_case => {
				_case.assigned_officers.map(officer => {
					officer.password = undefined;
				});
			});
			return res.status(status_codes.SUCCESS).json(cases);
		})
		.catch(err => {
			return res.status(status_codes.DATA_NOT_FOUND).json({
				error: err.message
			});
		});
};

module.exports = searchGD;
