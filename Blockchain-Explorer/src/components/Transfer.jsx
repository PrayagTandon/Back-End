import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import CryptoJS from 'crypto-js';

const Transfer = ({ addNewTransaction, availableAddresses }) => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState(faker.finance.ethereumAddress());
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            transactionHash: CryptoJS.SHA256(faker.datatype.uuid()).toString(),
            from: fromAddress,
            to: toAddress,
            amount: `${amount} ETH`,
            gasUsed: faker.datatype.number({ min: 21000, max: 500000 }),
            timestamp: new Date().toISOString(),
        };

        addNewTransaction(newTransaction);
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className="border p-6 rounded-lg bg-gray-50 w-2/4 m-auto">
            <h3 className="font-semibold text-lg mb-2">Create New Transfer</h3>

            <div className="mb-4">
                <label className="block text-sm font-medium">From Address</label>
                <select
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="mt-1 block w-full p-3 border rounded-md "
                    required
                >
                    <option value="">Select From Address</option>
                    {availableAddresses.map((address, index) => (
                        <option key={index} value={address}>
                            {address}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium">To Address</label>
                <select
                    value={fromAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="mt-1 block w-full p-3 border rounded-md "
                    required
                >
                    <option value="">Select To Address</option>
                    {availableAddresses.map((address, index) => (
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

            <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-md shadow-md transition-all hover:bg-blue-600 hover:cursor-pointer">
                Transfer
            </button>
        </form>
    );
};

export default Transfer;
