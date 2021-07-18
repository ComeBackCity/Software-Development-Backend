const officerModel = require('../../models/oficers/officer');
const officerTokenModel = require('../../models/oficers/officerToken');
const status_codes = require('../../utils/status_codes');
const { generateToken } = require('../../utils/token/token');

const login = async (req, res) => {
	const officer = await officerModel
		.findOne({
			badge_no: req.body.badge_no,
			password: req.body.password
		})
		.populate('thana');

	if (!officer) {
		return res.status(status_codes.UNAUTHORIZED).json({
			error: 'Wrong credentials'
		});
	}

	officer.password = undefined;

	await officerTokenModel.deleteMany(
		{
			officer_id: officer._id
		},
		function(error) {
			if (error) {
				return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
					error: 'Something went wrong'
				});
			}
		}
	);

	const payload = {
		officer_id: officer._id,
		rank: officer.rank,
		thana: officer.thana._id,
		time: new Date()
	};

	const token = generateToken(payload);

	const new_token = await officerTokenModel.create(payload);

	if (new_token) {
		return res.status(status_codes.SUCCESS).json({
			message: 'Successful login',
			officer,
			token
		});
	} else {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: 'Error while processing request'
		});
	}
};

module.exports = login;
