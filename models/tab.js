// models/TAB.JS //

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TabSchema = Schema({
	openFor   : String
});

var Tab = mongoose.model('Tab', TabSchema);

module.exports = Tab;