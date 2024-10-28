// routes/blockRoutes.js

const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel'); // Import the Address model

// Route to get list of Ethereum addresses from the database
router.get('/addresses', async (req, res) => {
    try {
        const addresses = await Address.find({}, 'transactionHash');
        res.json(addresses.map(addr => addr.address));
    } catch (error) {
        console.error('Error fetching addresses from the database:', error);
        res.status(500).json({ message: 'Server error fetching addresses' });
    }
});

router.get('/details/:address', async (req, res) => {
    const { address } = req.params;

    try {
        const addressData = await Address.findOne({ address });
        if (!addressData) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(addressData);
    } catch (error) {
        console.error('Error fetching address details:', error);
        res.status(500).json({ message: 'Server error fetching address details' });
    }
});

module.exports = router;
