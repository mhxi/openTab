var port = 1337;

module.exports = {
	port: port,
	db: 'mongodb://localhost/openTab',
	TOKEN_SECRET: process.env.TOKEN_SECRET
};