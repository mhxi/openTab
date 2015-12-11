// resources/TABS.JS //

var Post = require('../models/tab.js'),
	User = require('../models/user.js'),
	auth = require('./auth');

module.exports = function(app) {
	app.post('/api/tabs', auth.ensureAuthenticated, function (req,res) {
		User.findById(req.userId).exec(function (err, user) {
			var tab = new Tab(req.body);
			tab.save(function (err, tab) {
				user.tabs.unshift(tab._id);
				user.save();
				res.send(tab);
			});
		});
	});
};