const chargeSheetModel = require('../../models/chargeSheet/chargeSheet');
const status_codes = require('../../utils/status_codes');

const createCS = async ( req, res ) => {
	chargeSheetModel.create(
		req.body
	).then(r => {
		return res.status(status_codes.SUCCESS).json({
			message: "Successfully documented investigation report"
		})
	}).catch(err => {
		return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
			message: err.message
		})
	})
}

module.exports = createCS
