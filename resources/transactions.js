// resources/TRANSACTIONS.JS //

var Transaction = require('../models/transaction.js'),
	Tab = require('../models/tab.js'),
	// User = require('../models/user.js'),
	auth = require('./auth');

module.exports = function(app) {
	app.post('/api/tabs/:tab_id/transactions', auth.ensureAuthenticated, function (req, res) {
		Tab.findById(req.tabId).exec(function (err, tab) { //findBy Tab instead of User
			var transaction = new Transaction(req.body);
			transaction.save(function (err, transaction) {
				tab.transactions.unshift(transaction._id);
				tab.save();
				res.send(transaction);
			});
		});
	});
};