const database = require('../../utils/database/database');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const courtInfoSchema = mongoose.Schema({
	case: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Case'
	},

	name_of_court: {
		type: String,
		required: true
	},

	judge: {
		type: String,
		required: true
	},

	state_lawyer: {
		type: String,
		required: true
	},

	defending_lawyer: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		required: true
	}
});

const court = database.model('Court', courtInfoSchema);

module.exports = court;
