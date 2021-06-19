const database = require('../../utils/database/database');

const userToken = database.model('User Token', {
	user_nid: {
		type: String,
		required: true,
		unique: true
	},

	time: {
		type: Date,
		required: true,
		default: Date.now
	}
});

module.exports = userToken;
