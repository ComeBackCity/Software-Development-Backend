const userModel = require('../../models/public/user');
const status_codes = require('../../utils/status_codes');

const createAccount = async (req, res) => {
	const nidRegEx = /([0-9]{10})/;
	const phoneNoRegEx = /((0088)|(\+88))?[0-9]{11}/;

	if (!nidRegEx.test(req.body.nid)) {
		return res.status(status_codes.BAD_REQUEST).json({
			error: 'Invalid nid format'
		});
	}

	if (!phoneNoRegEx.test(req.body.phone_no)) {
		return res.status(status_codes.BAD_REQUEST).json({
			error: 'Invalid phone no format'
		});
	} else {
		req.body.phone_no = req.body.phone_no.substr(
			req.body.phone_no.length - 11,
			req.body.phone_no.length
		);
	}

	let user = userModel
		.create({
			name: req.body.name,
			nid: req.body.nid,
			phone_no: req.body.phone_no,
			password: req.body.password
		})
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Success'
			});
		})
		.catch(err => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				error: 'Something went wrong'
			});
		});
};

module.exports = createAccount;
