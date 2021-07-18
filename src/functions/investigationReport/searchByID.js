const investigationReportModel = require('../../models/investigationReport/investigationReport');
const status_codes = require('../../utils/status_codes');

const investigationReportByID = async (req, res) => {
	investigationReportModel
		.findById(req.query._id)
		.then(r => {
			return res.status(status_codes.SUCCESS).json(r);
		})
		.catch(err => {
			return res.status(status_codes.DATA_NOT_FOUND).json({
				error: err.message
			});
		});
};

module.exports = investigationReportByID;
