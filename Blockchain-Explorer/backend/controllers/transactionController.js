const Transaction = require('../models/transactionModel');
const CryptoJS = require('crypto-js');

// Get all transactions (for Blocks, Transactions, etc.)
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();  // Fetch all transactions from MongoDB
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Send a new transfer (via the Transfer component in frontend)
// controllers/transactionController.js
exports.sendTransfer = async (req, res) => {
    const { from, to, amount } = req.body;
    try {
        const receiptHash = CryptoJS.SHA256(`${from}-${to}-${Date.now()}`).toString();
        const newTransaction = new Transaction({
            from,
            to,
            amount,
            gasUsed: Math.floor(Math.random() * 100000),
            receiptHash,
            timestamp: new Date().toISOString(),
        });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
