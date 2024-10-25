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
exports.sendTransfer = async (req, res) => {
    const { source, destination, amount } = req.body;

    try {
        // Create a new transaction object
        const receiptHash = CryptoJS.SHA256(`${source}-${destination}-${Date.now()}`).toString();
        const newTransaction = new Transaction({
            source,
            destination,
            amount,
            gasUsed: Math.floor(Math.random() * 100000),  // Mock gas used
            receiptHash,
        });

        // Save the transaction to MongoDB
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
