const database = require('../../utils/database/database');
const { Schema } = require('mongoose');

const officer = database.model('Officer', {
	badge_no: {
		type: String,
		required: true,
		unique: true
	},

	name: {
		type: String,
		required: true,
		trim: true
	},

	rank: {
		type: String,
		required: true,
		trim: true,
		enum: ['অফিসার ইন চার্জ', 'সাব ইন্সপেক্টর', 'এসিট্যান্ট সাব ইন্সপেক্টর', 'কনস্টেবল']
	},

	thana: {
		type: Schema.Types.ObjectId,
		ref: 'Thana'
	},

	password: {
		type: String,
		required: true
	}
});

module.exports = officer;
