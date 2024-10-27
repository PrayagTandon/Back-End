const Transaction = require('../models/transactionModel');
const crypto = require('crypto');

const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};

const sendTransfer = async (req, res) => {
    const { source, destination, amount } = req.body;
    try {
        const transactionHash = crypto.randomBytes(16).toString('hex');
        const receiptHash = crypto.randomBytes(16).toString('hex');
        const gasUsed = Math.floor(Math.random() * 1000) + 1;

        const transaction = new Transaction({
            transactionHash,
            from: source,
            to: destination,
            amount,
            status: 'success',
            gasUsed,
            receiptHash
        });

        await transaction.save();

        const receipt = {
            transactionHash,
            from: source,
            to: destination,
            amount,
            gasUsed,
            receiptHash,
        };

        res.status(201).json(receipt);
    } catch (error) {
        console.error("Error processing transaction:", error);
        res.status(500).json({ error: "Failed to process transaction" });
    }
};

module.exports = {
    getTransactionHistory,
    sendTransfer
};
