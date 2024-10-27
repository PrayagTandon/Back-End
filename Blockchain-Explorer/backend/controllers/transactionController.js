const Transaction = require('../models/transactionModel');
const CryptoJS = require('crypto-js');

// Fetch transaction history
const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).lean();
        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};

// Example placeholder for a transaction send function
const sendTransaction = async (req, res) => {
    const { from, to, amount } = req.body;
    try {
        const newTransaction = new Transaction({
            transactionHash: `0x${Math.random().toString(36).substr(2, 64)}`,  // Random transaction hash for demo purposes
            from,
            to,
            amount
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ error: "Failed to create transaction" });
    }
};

module.exports = {
    getTransactionHistory,
    sendTransaction
};