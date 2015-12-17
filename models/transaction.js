// models/TRANSACTION.JS //

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	created_at  : { type: Date },
    updated_at  : { type: Date },
	description : { type: String, required: true, trim: true },
	amount		: { type: Number, required: true }
});

TransactionSchema.pre('save', function (next) {
    // SET CREATED_AT AND UPDATED_AT
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;