const caseModel = require('../../models/cases/case');
const status_codes = require('../../utils/status_codes');

const caseByID = async (req, res) => {
	caseModel
		.findById(req.query._id)
		.populate('assigned_officers.officer')
		.populate('thana')
		.populate({
			path: 'links',
			populate: {
				path: 'recordedBy'
			}
		})
		.then(r => {
			let hasAccess = false;

			if (req.officer.rank === 'অফিসার ইন চার্জ') {
				hasAccess = true;
			} else {
				for (let officer of r.assigned_officers) {
					if (officer.id.toString() === req.officer._id.toString()) {
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

module.exports = caseByID;
