const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const appealSchema = mongoose.Schema({
	case: {
		type: String,
		required: true,
		ref: 'Case'
	},

	date: {
		type: Date,
		required: true,
		default: Date.now
	},

	court: {
		type: String,
		required: true
	},

	applicant: {
		type: String,
		required: true
	},

	application: {
		type: String,
		required: true
	},

	documents: {
		type: [String],
		required: true
	}
});

const appeal = database.model('Appeal', appealSchema);

module.exports = appeal;
