// resources/TABS.JS //

var Tab = require('../models/tab.js'),
	User = require('../models/user.js'),
	auth = require('./auth');

module.exports = function(app) {

	// CREATE TAB
	app.post('/api/tabs', auth.ensureAuthenticated, function (req, res) {
		// Tab.create(req.body, function(err, tab){
		// 	if (err) {
		// 		return res.send(err);
		// 	}
		// 	console.log(tab);
		// 	res.status(201).send(tab);
		User.findById(req.userId).exec(function (err, user) {
			var tab = new Tab(req.body);
			tab.save(function (err, tab) {
				user.tabs.unshift(tab._id);
				user.save();
				res.send(tab);
			});
		});
	});

	// DELETE TAB by ID
	app.delete('/api/tabs/:tab_id', function (req, res) {
		Tab.findById(req.params.tab_id, function (err, tab) {
			if (err) {
				return res.send(err);
			}
			User.remove({ _id: {$in: tab.user} }, function (err) {
				if (err) {
					return res.send(err);
				}
				Tab.remove({ _id: tab._id}, function (err) {
					if (err) {
						return res.send(err);
					}
					res.status(200).send("Delete Success");
				});
			});
		});
	});



	// app.delete('/api/tabs/:tab_id', function (req, res) {
	// 	Tab.findById(req.params.tab_id, function (err, tab) {
	// 		console.log(tab); //CHECK
	// 		return tab.remove(function (err) {
	// 			if (!err) {				
	// 				User.find({ tabs: tab._id }, function(err, user) {
	// 					console.log(user.tabs); //CHECK
	// 					var tabIndex = user.tabs.indexOf(tab._id);
	// 					user.tabs.splice(tabIndex, 1);
	// 					user.save();
	// 					console.log(user);
	// 				});
	// 			}
	// 		});
	// 	});
	// });
			// 	return res.send(err);
			// res.status(200).send('Success');

};