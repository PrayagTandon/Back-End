const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const connectDB = require('./config/database');
require('dotenv').config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionRoutes);

module.exports = app;
