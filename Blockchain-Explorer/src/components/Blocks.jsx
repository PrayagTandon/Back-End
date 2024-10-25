import React, { useState } from 'react';
import BlockDetails from './BlockDetails';

const Blocks = ({ transactions }) => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedBlock, setSelectedBlock] = useState(null);

    const handleOnChange = (e) => {
        const address = e.target.value;
        setSelectedAddress(address);

        // Find the block (transaction) by matching the 'from' or 'to' address
        const block = transactions.find((tx) => tx.from === address || tx.to === address);

        // If block is found, set it, else reset the block
        if (block) {
            setSelectedBlock(block);
        } else {
            setSelectedBlock(null);
        }
    };

    return (
        <div className='w-2/4 m-auto'>
            <h3 className="font-semibold text-lg mb-2">Select Block by Address</h3>
            <select
                value={selectedAddress}
                onChange={handleOnChange}
                className="block w-full p-3 border border-gray-300 rounded-md shadow-md mb-12"
            >
                <option value="">Select an Address</option>
                {/* List addresses from transactions */}
                {transactions.map((tx, index) => (
                    <option key={index} value={tx.from}>
                        {tx.from}
                    </option>
                ))}
            </select>

            {/* Conditionally render BlockDetails or an error message */}
            {selectedBlock ? (
                <BlockDetails {...selectedBlock} />
            ) : (
                selectedAddress && (
                    <div className="bg-yellow-100 text-red-700 p-4 mt-4 rounded-md">
                        No transaction found for the selected address.
                    </div>
                )
            )}
        </div>
    );
};

export default Blocks;
