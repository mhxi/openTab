// resources/TABS.JS //

var Tab = require('../models/tab.js'),
	// Transaction = require('../models/transaction.js'),
	User = require('../models/user.js'),
	auth = require('./auth');

module.exports = function(app) {

	// GET ALL TABS
	app.get('/api/tabs', function (req, res) {
		Tab.find({}, function(err, tabs) {
			if (err) {
				return res.status(404).send(err);
			}
			res.status(200).send(tabs);
		});
	});

	// CREATE TAB
	app.post('/api/tabs', auth.ensureAuthenticated, function (req, res) {
		User.findOne({ email: req.body.openFor }, function (err, user) {
			Tab.create({ createdBy: req.body.createdBy, openFor: user._id }, function (err, tab) {
				if (err) {
					return res.status(400).send(err);
				}
				res.status(201).send(tab);
			});
		});
	});

	// DELETE TAB by ID
	app.delete('/api/tabs/:tab_id', function (req, res) {
		Tab.findByIdAndRemove(req.params.tab_id, function (err, tab) {
			if (err) {
				return res.status(400).send(err);
			}
			res.status(200).send('Successfully deleted Tab');
		});
	});

	// GET TAB by ID
	// app.get('/api/tabs/:tab_id', function (req, res) {
	// 	Tab.findById(req.params.tab_id, function (err, post) {
	// 		if (err) {
	// 			return res.status(404).send(err);
	// 		}
	// 		res.status(200).send(tab);
	// 	});
	// });

	// UPDATE TAB
	// app.put('/api/tabs/:tab_id', function (req, res) {
	// 	Tab.findOneAndUpdate({ _id: req.params.tab_id}, req.query.tab, function (err, tab) {
	// 		if (err) {
	// 			return res.status(400).send(err);
	// 		}
	// 		res.status(200).send(tab);
	// 	});
	// });
};