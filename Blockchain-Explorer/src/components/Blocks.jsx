// Blocks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlockDetails from './BlockDetails';

const Blocks = () => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [selectedTransactions, setSelectedTransactions] = useState([]);

    // Fetch Ethereum addresses from backend on component mount
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/api/blocks/addresses');
                setAddresses(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching addresses:", error);
                setAddresses([]); // Fallback to empty array on error
            }
        };

        fetchAddresses();
    }, []);

    const handleOnChange = async (e) => {
        const address = e.target.value;
        setSelectedAddress(address);

        // Only fetch transactions if a valid address is selected
        if (address) {
            try {
                const response = await axios.get(`/api/blocks/details/${address}`);
                setSelectedTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transaction details:", error);
                setSelectedTransactions([]);
            }
        } else {
            setSelectedTransactions([]); // Clear transactions if no address is selected
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">Select Block by Address</h3>
            <select
                value={selectedAddress}
                onChange={handleOnChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
            >
                <option value="">Select an Address</option>
                {addresses.map((address, index) => (
                    <option key={index} value={address}>
                        {address}
                    </option>
                ))}
            </select>

            {selectedTransactions.length > 0 ? (
                selectedTransactions.map((transaction) => (
                    <BlockDetails key={transaction.transactionHash} {...transaction} />
                ))
            ) : (
                <div className="bg-yellow-100 text-yellow-700 p-4 mt-4 rounded-md">
                    {selectedAddress ? 'No transactions found for this address.' : 'Please select an address.'}
                </div>
            )}
        </div>
    );
};

export default Blocks;
