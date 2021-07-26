const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const resolveSchema = mongoose.Schema({
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

	officer: {
		type: String,
		required: true
	},

	summary: {
		type: String,
		required: true
	},

	documents: {
		type: [String],
		required: true
	}
});

const resolve = database.model('Resolve', resolveSchema);

module.exports = resolve;
