// Transfer.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Receipt from './Receipt';

const Transfer = ({ addNewTransaction }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [receipt, setReceipt] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/api/blocks/addresses');
                setAddresses(response.data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/transactions/send', {
                source: fromAddress,
                destination: toAddress,
                amount
            });
            setReceipt(response.data);  // Display receipt on successful transaction
            addNewTransaction(response.data);  // Add new transaction to transaction history
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-2 border-orange-700 p-4 rounded-lg bg-gray-50 mt-8">
            <h3 className="font-semibold text-lg mb-2">Create New Transfer</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium">From Address</label>
                <select
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                    required
                >
                    <option value="">Select From Address</option>
                    {addresses.map((address, index) => (
                        <option key={index} value={address}>
                            {address}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">To Address</label>
                <select
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                    required
                >
                    <option value="">Select To Address</option>
                    {addresses.map((address, index) => (
                        <option key={index} value={address}>
                            {address}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">Amount (ETH)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                    required
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
