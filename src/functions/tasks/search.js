const taskModel = require('../../models/task/task');
const status_codes = require('../../utils/status_codes');

const searchTask = async (req, res) => {
	let queryPayload = {};

	if (req.query.title) {
		let subjectRegex = new RegExp('.*?');
		if (req.query.title) {
			subjectRegex = new RegExp('^' + req.query.title, 'i');
		}

		queryPayload.title = {
			$regex: subjectRegex
		};
	}

	if (req.query.status) {
		queryPayload.status = {
			$in: req.query.status
		};
	}

	if (req.query.startDate) {
		queryPayload.date = {
			$gte: req.query.startDate,
			$lte: req.query.endDate
		};
	}

	await taskModel
		.find(queryPayload)
		.populate('assigned_officers')
		.then(tasks => {
			tasks.map(task => {
				task.assigned_officers.map(officer => {
					officer.password = undefined;
				});
			});
			return res.status(status_codes.SUCCESS).json(tasks);
		})
		.catch(error => {
			return res.status(status_codes.DATA_NOT_FOUND).json({
				message: error.message
			});
		});
};

module.exports = searchTask;
