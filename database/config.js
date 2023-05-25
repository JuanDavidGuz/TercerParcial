const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION, {
			autoIndex: true,
		});

		console.log('Success Connection DB');
	} catch (error) {
		console.log(error);
		throw new Error('Error Connection DB');
	}
};

module.exports = { dbConnection };
