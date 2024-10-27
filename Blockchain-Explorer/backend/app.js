const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

module.exports = app;
