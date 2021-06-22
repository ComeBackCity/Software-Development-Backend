const database = require('../../utils/database/database');
const { Schema } = require('mongoose');

const gd = database.model('General Diary', {
	topic: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	for: {
		type: [
			{
				name: {
					type: String,
					required: true
				},

				address: {
					type: String,
					required: true
				},

				phone_no: {
					type: String,
					required: true,
					validate: {
						validator: function (v) {
							return /((0088)|(\+88))?[0-9]{11}/.test(v);
						},

						message: props => `${props.value} is invalid nid format`
					}
				},

				nid: {
					type: String,
					required: true,
					validate: {
						validator: function (v) {
							return /([0-9]{10})/.test(v);
						},

						message: props => `${props.value} is invalid nid format`
					}
				},

				father_name: {
					type: String,
					required: true
				}
			}
		],

		required: true,

		validate: [
			val => {
				return val.length > 0;
			},
			'Minimum length is 1'
		]
	},

	against: {
		type: [
			{
				name: {
					type: String,
					required: true
				},

				address: {
					type: String,
					required: true
				},

				phone_no: {
					type: String,
					required: true,
					validate: {
						validator: function (v) {
							return /((0088)|(\+88))?[0-9]{11}/.test(v);
						},

						message: props => `${props.value} is invalid nid format`
					}
				},

				father_name: {
					type: String,
					required: true
				}
			}
		],

		required: true,

		validate: [
			val => {
				return val.length > 0;
			},
			'Minimum length is 1'
		]
	},

	thana: {
		type: Schema.Types.ObjectId,
		ref: 'Thana'
	},

	date: {
		type: Date,
		required: true,
		default: Date.now
	},

	resolved: {
		type: Boolean,
		required: true,
		default: false
	},

	primary_document: {
		type: [String],
		required: true
	},

	optional_documents: {
		type: [String],
		default: []
	}
});

module.exports = gd;
