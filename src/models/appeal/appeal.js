const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const appealSchema = mongoose.Schema({
	case: {
		type: Schema.Types.ObjectId,
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

	document: {
		type: String,
		required: true
	}
});

const appeal = database.model('Appeal', appealSchema);

module.exports = appeal;
