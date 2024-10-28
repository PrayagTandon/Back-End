const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

router.get('/addresses', async (req, res) => {
    try {
        const addresses = await Transaction.aggregate([
            { $project: { from: 1, to: 1 } },
            { $group: { _id: null, addresses: { $addToSet: "$from" } } },
            { $unwind: "$addresses" }
        ]);
        res.json(addresses.map(a => a.addresses));
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Server error fetching addresses' });
    }
});

router.get('/details/:address', async (req, res) => {
    const { address } = req.params;

    try {
        const transactions = await Transaction.find({
            $or: [{ from: address }, { to: address }]
        });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this address' });
        }

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        res.status(500).json({ message: 'Server error fetching transaction details' });
    }
});

module.exports = router;
