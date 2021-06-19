const taskModel = require('../../models/task/task');
const status_codes = require('../../utils/status_codes');
const mongoose = require('mongoose');

const createTask = async (req, res) => {
	let officers = [];

	for (let officer of req.body.assigned_officers) {
		if (typeof officer === 'string') {
			officers.push(mongoose.Types.ObjectId(officer));
		} else {
			officers.push(officer);
		}
	}

	req.body.assigned_officers = officers;

	taskModel
		.create({
			title: req.body.title,
			description: req.body.description,
			location: req.body.location,
			date: req.body.date,
			assigned_officers: req.body.assigned_officers
		})
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Task created successfully'
			});
		})
		.catch(error => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: error.message
			});
		});
};

module.exports = createTask;
