const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const hearingSchema = new mongoose.Schema({
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

	description: {
		type: String,
		required: true
	},

	primary_documents: {
		type: [String],
		required: true
	}
});

const hearing = database.model('Hearing', hearingSchema);

module.exports = hearing;
