// Blocks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlockDetails from './BlockDetails';

const Blocks = ({ transactions }) => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [addresses, setAddresses] = useState([]);

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

    const handleOnChange = (e) => {
        const address = e.target.value;
        setSelectedAddress(address);
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

            {selectedAddress && (
                <BlockDetails address={selectedAddress} balance="N/A" gasUsed="N/A" />
            )}
        </div>
    );
};

export default Blocks;
