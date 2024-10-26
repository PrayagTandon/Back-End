import React, { useState } from 'react';
import BlockDetails from './BlockDetails';

const Blocks = ({ transactions }) => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedBlock, setSelectedBlock] = useState(null);

    const handleOnChange = (e) => {
        const address = e.target.value;
        setSelectedAddress(address);

        // Find the block (transaction) by matching the 'from' or 'to' address
        const block = (Array.isArray(transactions) ? transactions : []).find(
            (tx) => tx.from === address || tx.to === address
        );
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
                {(Array.isArray(transactions) ? transactions : []).map((tx, index) => (
                    <option key={index} value={tx.from}>
                        {tx.from}
                    </option>
                ))}
            </select>

            {/* Conditionally render BlockDetails or an error message */}
            {selectedBlock ? (
                <div className="border p-4 rounded-md mt-4">
                    <strong>Transaction Hash:</strong> {selectedBlock.transactionHash} <br />
                    <strong>From:</strong> {selectedBlock.from} <br />
                    <strong>To:</strong> {selectedBlock.to} <br />
                    <strong>Amount:</strong> {selectedBlock.amount} ETH
                </div>
            ) : (
                selectedAddress && <div>No transaction found for the selected address.</div>
            )}
        </div>
    );
};

export default Blocks;
