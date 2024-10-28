// Transactions.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 6;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions/history');
                setTransactions(Array.isArray(response.data) ? response.data : []); // Ensure transactions is an array
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setTransactions([]); // Set to empty array on error
            }
        };

        fetchTransactions();
    }, []);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = Array.isArray(transactions)
        ? transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
        : []; // Ensure currentTransactions is always an array

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    return (
        <div>
            <h3 className="font-semibold text-lg mb-4">All Transactions</h3>
            <ul className="flex flex-col gap-4">
                {(Array.isArray(currentTransactions) ? currentTransactions : []).map((tx, index) => (
                    <li key={tx.transactionHash || index} className="border-2 rounded-md py-3 px-4 odd:bg-[#f584a0] even:bg-[#d381de] border-[#803a0c] flex flex-col gap-1">
                        <strong>Transaction Hash:</strong> {tx.transactionHash} <br />
                        <strong>From:</strong> {tx.from} <br />
                        <strong>To:</strong> {tx.to} <br />
                        <strong>Amount:</strong> {tx.amount} ETH
                    </li>
                ))}
            </ul>

            <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => setCurrentPage(number + 1)}
                        className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === number + 1 ? 'bg-blue-800 cursor-pointer text-white' : 'bg-white text-black'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
