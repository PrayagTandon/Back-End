const Transaction = require('../models/transactionModel');
const CryptoJS = require('crypto-js');

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Send a transfer
exports.sendTransfer = async (req, res) => {
    const { source, destination, amount } = req.body;

    try {
        const receiptHash = CryptoJS.SHA256(`${source}-${destination}-${Date.now()}`).toString();
        const newTransaction = new Transaction({
            source,
            destination,
            amount,
            gasUsed: Math.floor(Math.random() * 100000),
            receiptHash,
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
