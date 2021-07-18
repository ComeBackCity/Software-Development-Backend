const investigationReportModel = require('../../models/investigationReport/investigationReport');
const status_codes = require('../../utils/status_codes');

const createIR = async (req, res) => {
	investigationReportModel
		.create(req.body)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				id: r._id,
				message: 'Successfully documented investigation report'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				message: err.message
			});
		});
};

module.exports = createIR;
