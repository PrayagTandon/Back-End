// Blocks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlockDetails from './BlockDetails';

const Blocks = ({ transactions }) => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('/api/blocks/addresses');
                setAddresses(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching addresses:", error);
                setAddresses([]);
            }
        };

        fetchAddresses();
    }, []);

    const handleOnChange = async (e) => {
        const address = e.target.value;
        setSelectedAddress(address);
        try {
            const response = await axios.get(`/api/blocks/details/${address}`);
            setSelectedBlock(response.data);
        } catch (error) {
            console.error("Error fetching block details:", error);
            setSelectedBlock(null);
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
                {(Array.isArray(addresses) ? addresses : []).map((address, index) => (
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
