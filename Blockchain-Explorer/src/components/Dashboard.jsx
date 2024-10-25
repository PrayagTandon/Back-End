import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transactions from './Transactions';
import Transfer from './Transfer';
import Blocks from './Blocks';

const Dashboard = ({ section }) => {
    const [transactions, setTransactions] = useState([]);  // Initialize as an array
    const [latestBlocks, setLatestBlocks] = useState([]);  // Initialize as an array

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions/history');
                const data = Array.isArray(response.data) ? response.data : [];
                setTransactions(data);
                setLatestBlocks(data.slice(0, 2));  // Set latest blocks only if data is an array
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactions([]);
                setLatestBlocks([]);  // Reset latestBlocks on error
            }
        };

        fetchTransactions();
    }, []);

    const addNewTransaction = (newTx) => {
        setTransactions((prevTx) => [newTx, ...prevTx]);
        setLatestBlocks((prevBlocks) => [newTx, ...prevBlocks.slice(0, 1)]);
    };

    const availableAddresses = Array.isArray(transactions) ? transactions.map((tx) => tx.from) : [];

    return (
        <div className="m-6 backdrop-blur-2xl border-4 border-[#8e726a] rounded-md">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-center mb-8 underline">Blockchain Overview</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className='w-[95%]'>
                        <h3 className="font-semibold text-lg mb-4">Latest Blocks</h3>
                        <ul className='flex flex-col gap-4'>
                            {(Array.isArray(latestBlocks) ? latestBlocks : []).map((block, index) => (
                                <li key={index} className="border-2 rounded-md py-3 px-4 bg-[#95a9f2] border-[#193dc1] flex flex-col gap-1">
                                    <strong>Transaction Hash:</strong> {block.transactionHash} <br />
                                    <strong>From:</strong> {block.from} <br />
                                    <strong>To:</strong> {block.to} <br />
                                    <strong>Amount:</strong> {block.amount} ETH
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        {section === 'transactions' && <Transactions transactions={transactions} />}
                        {section === 'transfer' && <Transfer addNewTransaction={addNewTransaction} availableAddresses={availableAddresses} />}
                        {section === 'blocks' && <Blocks transactions={transactions} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
