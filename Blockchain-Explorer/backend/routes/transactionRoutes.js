const express = require('express');
const router = express.Router();
const { getTransactionHistory, sendTransfer } = require('../controllers/transactionController');

router.get('/history', getTransactionHistory);
router.post('/send', sendTransfer);

module.exports = router;
