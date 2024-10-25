const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/', transactionRoutes);  // Prefix all routes with /api/transactions

module.exports = app;
