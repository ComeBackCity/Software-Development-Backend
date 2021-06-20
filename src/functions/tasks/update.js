const taskModel = require('../../models/task/task');
const status_codes = require('../../utils/status_codes');
const mongoose = require('mongoose');

const updateCase = async (req, res) => {
	await taskModel
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
				message: 'Task updated successfully'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = updateCase;
