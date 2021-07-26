const investigationReportGDModel = require('../../models/InvestigationReportGD/InvestigationReportGD');
const status_codes = require('../../utils/status_codes');

const createIRGD = async (req, res) => {
	investigationReportGDModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				id: r._id,
				message: 'Successfully documented investigation report for gd'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createIRGD;
