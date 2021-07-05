const gdModel = require('../../models/gd/gd');
const status_codes = require('../../utils/status_codes');

const gdByID = async (req, res) => {
	gdModel
		.findById(req.query._id)
		.populate('assigned_officers.officer')
		.populate('thana')
		.then(r => {
			let hasAccess = false;

			if (req.officer.rank === 'Officer in Charge') {
				hasAccess = true;
			} else {
				for (let officer in req.assigned_officers) {
					if (officer._id === req.officer._id) {
						hasAccess = true;
					}
				}
			}

			if (!hasAccess) {
				return res.status(status_codes.UNAUTHORIZED).json({
					error: 'You do not have permission to see this'
				});
			}

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

module.exports = gdByID;
