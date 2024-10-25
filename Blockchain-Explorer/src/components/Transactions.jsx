import React, { useState } from 'react';

const Transactions = ({ transactions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 8;

    // Pagination logic
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">All Transactions</h3>
            <ul className='flex justify-center items-center gap-6 flex-wrap'>
                {currentTransactions.map((tx, index) => (
                    <li key={index} className="border p-4 rounded-md mb-2 shadow-lg odd:bg-[#dde9e2] even:bg-[#fed9e7]">
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
                        className={`px-4 py-2 mx-1 border rounded hover:bg-blue-600 hover:cursor-pointer hover:text-white ${currentPage === number + 1 ? 'bg-blue-800 text-white' : 'bg-white text-black'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
