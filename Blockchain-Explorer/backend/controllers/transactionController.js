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

exports.sendTransfer = async (req, res) => {
    let { from, to, amount } = req.body;

    try {
        // Ensure from, to, and amount are provided
        if (!from || !to || !amount) {
            return res.status(400).json({ message: 'From, to, and amount are required' });
        }

        // Convert amount to a number if it's a string
        amount = parseFloat(amount);

        // Validate that amount is a number
        if (isNaN(amount)) {
            return res.status(400).json({ message: 'Amount must be a valid number' });
        }

        // Generate transaction hash and create transaction object
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
        console.error('Error in sendTransfer:', error);
        res.status(500).json({ message: error.message });
    }
};