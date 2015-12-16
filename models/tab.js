// models/TAB.JS //

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Transaction = require('../models/transaction.js');

// GETTER
function toLower (str) {
    return str.toLowerCase();
}

var TabSchema = new Schema({
	created_at	 : { type: Date },
    updated_at   : { type: Date },
	createdBy    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
	openFor		 : [{ type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true, set: toLower }],
	transactions : [ Transaction.schema ]
});

TabSchema.pre('save', function (next) {
    // SET CREATED_AT AND UPDATED_AT
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
    this.created_at = now;
    }
    next();
});

var Tab = mongoose.model('Tab', TabSchema);
module.exports = Tab;