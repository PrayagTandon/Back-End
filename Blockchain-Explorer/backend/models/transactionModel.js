const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionHash: { type: String, unique: true, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['success', 'failure'], required: true },
    gasUsed: { type: Number, required: false },
    receiptHash: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
