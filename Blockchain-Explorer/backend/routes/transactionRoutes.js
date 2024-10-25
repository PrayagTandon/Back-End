const express = require('express');
const { getTransactionHistory, sendTransfer } = require('../controllers/transactionController');
const router = express.Router();

router.get('/history', getTransactionHistory);
router.post('/send', sendTransfer);

module.exports = router;
