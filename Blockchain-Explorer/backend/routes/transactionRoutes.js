const express = require('express');
const { getAllTransactions, sendTransfer } = require('../controllers/transactionController');
const router = express.Router();

router.get('/history', getAllTransactions);
router.post('/transfer', sendTransfer);

module.exports = router;
