// resources/TRANSACTIONS.JS //

var Transaction = require('../models/transaction.js'),
	Tab = require('../models/tab.js'),
	// User = require('../models/user.js'),
	auth = require('./auth');

module.exports = function(app) {

	// GET ALL TRANSACTIONS
	app.get('/api/tabs/:tab_id/transactions', function (req, res) {
		Tab.findById(req.params.tab_id, function (err, tab) {
			Transaction.find({}, function (err, transactions) {
				if (err) {
					return res.status(404).send(err);
				}
				res.status(200).send(transactions);
			});
		});
	});

	// CREATE TRANSACTION
	app.post('/api/tabs/:tab_id/transactions', auth.ensureAuthenticated, function (req, res) {
		Tab.findById(req.params.tab_id, function (err, tab) {
			Transaction.create(req.body, function (err, transaction) {
				if (err) {
					return res.status(405).send(err);
				}
				tab.transactions.unshift(transaction);
				tab.save(function (err) {
					if (err) {
						return res.status(409).send(err);
					}
				});
				res.status(201).send(transaction);
			});
		});
	});

	// DELETE TRANSACTION
	app.delete('/api/tabs/:tab_id/transactions/:transaction_id', function (req, res) {
		Tab.findById(req.params.tab_id, function (err, tab) {
			Transaction.findByIdAndRemove(req.params.transaction_id, function (err, transaction) {
				if (err) {
					return res.status(400).send(err);
				}
				res.status(200).send('Successfully deleted transaction!');
			});
		});
	});

	// GET SINGLE TRANSACTION by ID
	// app.get('/api/tabs/:tab_id/transactions/:transaction_id', function (req, res) {
	// 	Tab.findById(req.params.tab_id, function (err, tab) {
	// 		Transaction.findById(req.params.transaction_id, function (err, transaction) {
	// 			if (err) {
	// 				return res.status(404).send(err);
	// 			}
	// 			res.status(200).send(transaction);
	// 		});
	// 	});
	// });

	// UPDATE TRANSACTION
	// app.put('/api/tabs/:tab_id/transactions/:transaction_id', function (req, res) {
	// 	Tab.findById(req.params.tab_id, function (err, tab) {
	// 		Transaction.findOneAndUpdate({ _id: req.params.transaction_id}, req.query.transaction, function (err, transaction) {
	// 			if (err) {
	// 				return res.status(405).send(err);
	// 			}
	// 			res.status(200).send(transaction);
	// 		});
	// 	});
	// });
};