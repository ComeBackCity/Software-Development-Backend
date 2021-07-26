const investigationReportGDModel = require('../../models/InvestigationReportGD/InvestigationReportGD');
const status_codes = require('../../utils/status_codes');

const investigationReportGDByID = async (req, res) => {
	investigationReportGDModel
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

module.exports = investigationReportGDByID;
