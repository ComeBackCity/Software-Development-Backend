const taskModel = require('../../models/task/task');
const status_codes = require('../../utils/status_codes');

const taskByID = async (req, res) => {
	taskModel
		.findById(req.query._id)
		.populate('assigned_officers')
		.then(r => {
			r.assigned_officers.map(officer => {
				officer.password = undefined;
			});

			return res.status(status_codes.SUCCESS).json(r);
		})
		.catch(err => {
			return res.status(status_codes.DATA_NOT_FOUND).json({
				error: err.message
			});
		});
};

module.exports = taskByID;
