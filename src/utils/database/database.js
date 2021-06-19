const mongoose = require('mongoose');

const uri =
	'mongodb+srv://' +
	process.env.DB_NAME +
	':' +
	process.env.DB_PASSWORD +
	'@cluster0.nueh7.mongodb.net/cse408db?retryWrites=true&w=majority';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

module.exports = mongoose;
