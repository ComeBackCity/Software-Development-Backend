const officerTokenModel = require('../../models/oficers/officerToken');
const status_codes = require('../../utils/status_codes');
const { verifyToken } = require('../../utils/token/token');

const signOut = async (req, res) => {
	const token = req.header('Authorization').replace('Officer ', '');
	const info = verifyToken(token);

	await officerTokenModel
		.findOneAndRemove(
			{
				officer_id: info.officer_id
			},
			{
				useFindAndModify: false
			}
		)
		.then(r => {
			return res.status(status_codes.SUCCESS).json({
				message: 'Successfully logged out'
			});
		})
		.catch(err => {
			return res.status(status_codes.BAD_REQUEST).json({
				error: 'Error while processing request'
			});
		});
};

module.exports = signOut;
