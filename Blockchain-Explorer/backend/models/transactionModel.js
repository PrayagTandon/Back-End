const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionHash: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    gasUsed: { type: Number },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'success' },
});

module.exports = mongoose.model('Transaction', transactionSchema);
