// app.js
const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);

module.exports = app;
