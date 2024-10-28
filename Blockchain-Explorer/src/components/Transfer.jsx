// Transfer.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Receipt from './Receipt';

const Transfer = ({ addNewTransaction }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [receipt, setReceipt] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/transactions/send', {
                source: fromAddress,
                destination: toAddress,
                amount: parseFloat(amount)
            });
            setReceipt(response.data);
            addNewTransaction(response.data);

            // Clear the form fields after successful submission
            setFromAddress('');
            setToAddress('');
            setAmount('');
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-2 border-orange-700 p-4 rounded-lg bg-gray-50 mt-8">
            <h3 className="font-semibold text-lg mb-2">Create New Transfer</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium">From Address</label>
                <input
                    type="text"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                    required
                    placeholder="Enter From Address"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">To Address</label>
                <input
                    type="text"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                    required
                    placeholder="Enter To Address"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Amount (ETH)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                    required
                    placeholder="Enter Amount in ETH"
                />
            </div>

            <button type="submit" className="bg-[#036642] text-white px-4 py-2 rounded-md shadow-lg hover:bg-[#1c7555] cursor-pointer">
                Transfer
            </button>

            {receipt && <Receipt {...receipt} />}
        </form>
    );
};

export default Transfer;
