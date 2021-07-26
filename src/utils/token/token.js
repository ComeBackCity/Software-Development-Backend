const jwt = require('jsonwebtoken');

const generateToken = payload => {
	const expire_time = process.env.TOKEN_EXPIRE_TIME + ' ' + process.env.TOKEN_EXPIRE_UNIT;
	const token = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: expire_time
	});

	return token;
};

const verifyToken = (token, cb) => {
	return jwt.verify(token, process.env.SECRET_KEY, cb);
};

module.exports = {
	generateToken,
	verifyToken
};
