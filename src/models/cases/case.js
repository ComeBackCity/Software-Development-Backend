const database = require('../../utils/database/database');
const { Schema } = require('mongoose');

const cases = database.model('Case', {
	subject: {
		type: String,
		required: true
	},

	type: {
		type: String,
		required: true
	},

	assigned_officers: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Officer'
			}
		]
	},

	status: {
		type: String,
		required: true,
		enum: ['on hold', 'investigating', 'in court', 'closed']
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

	date: {
		type: Date,
		required: true,
		default: Date.now
	},

	verdict: {
		type: String
	},

	closed_date: {
		type: String
	},

	thana: {
		type: Schema.Types.ObjectId,
		ref: 'Thana'
	},

	description: {
		type: String,
		required: true
	},

	documents: [
		{
			type: String
		}
	]
});

module.exports = cases;
