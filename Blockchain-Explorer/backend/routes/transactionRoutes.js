const express = require('express');
const router = express.Router();
const { getTransactionHistory, sendTransaction } = require('../controllers/transactionController');

router.get('/history', getTransactionHistory);
router.post('/send', sendTransaction);

module.exports = router;

