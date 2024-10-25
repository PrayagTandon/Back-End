const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    source: { type: String, required: true },
    destination: { type: String, required: true },
    amount: { type: Number, required: true },
    gasUsed: { type: Number },
    receiptHash: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'success' },
});

module.exports = mongoose.model('Transaction', transactionSchema);
