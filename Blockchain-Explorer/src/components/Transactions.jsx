import React, { useState } from 'react';

const Transactions = ({ transactions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;

    // Pagination logic
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">All Transactions</h3>
            <ul>
                {currentTransactions.map((tx, index) => (
                    <li key={index} className="border p-2 rounded mb-2">
                        <strong>Transaction Hash:</strong> {tx.transactionHash} <br />
                        <strong>From:</strong> {tx.from} <br />
                        <strong>To:</strong> {tx.to} <br />
                        <strong>Amount:</strong> {tx.amount} ETH
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => setCurrentPage(number + 1)}
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
