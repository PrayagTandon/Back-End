import React, { useState } from 'react';
import BlockDetails from './BlockDetails';

const Blocks = ({ transactions }) => {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedBlock, setSelectedBlock] = useState(null);

    const handleOnChange = (e) => {
        const address = e.target.value;
        setSelectedAddress(address);
        const block = transactions.find((tx) => tx.from === address || tx.to === address);
        if (block) setSelectedBlock(block);
        else setSelectedBlock(null);
    };

    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">Select Block by Address</h3>
            <select
                value={selectedAddress}
                onChange={handleOnChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">Select an Address</option>
                {transactions.map((tx, index) => (
                    <option key={index} value={tx.from}>
                        {tx.from}
                    </option>
                ))}
            </select>

            {selectedBlock ? (
                <BlockDetails {...selectedBlock} />
            ) : (
                selectedAddress && <div>No transaction found for the selected address.</div>
            )}
        </div>
    );
};

export default Blocks;
