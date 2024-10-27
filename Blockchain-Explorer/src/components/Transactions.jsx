import React, { useState, useEffect } from 'react';

const Transactions = ({ transactions = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 8;
    const [currentTransactions, setCurrentTransactions] = useState([]);

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    // Ensure currentPage is within bounds whenever transactions length changes
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    // Update `currentTransactions` whenever `transactions` or `currentPage` changes
    useEffect(() => {
        if (Array.isArray(transactions) && transactions.length > 0) {
            const indexOfLastTransaction = currentPage * transactionsPerPage;
            const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
            setCurrentTransactions(transactions.slice(indexOfFirstTransaction, indexOfLastTransaction));
        } else {
            setCurrentTransactions([]); // Set to an empty array if transactions is empty or not an array
        }
    }, [transactions, currentPage]);

    // Prevent currentPage from going out of range
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-lg mb-2">All Transactions</h3>
            <ul className="flex justify-center items-center gap-6 flex-wrap">
                {(Array.isArray(currentTransactions) ? currentTransactions : []).map((tx, index) => (
                    <li key={tx.transactionHash || `${index}-${tx.amount}`} className="border p-4 rounded-md mb-2 shadow-lg odd:bg-[#dde9e2] even:bg-[#fed9e7]">
                        <strong>Transaction Hash:</strong> {tx.transactionHash} <br />
                        <strong>From:</strong> {tx.from} <br />
                        <strong>To:</strong> {tx.to} <br />
                        <strong>Amount:</strong> {tx.amount} ETH
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={`px-4 py-2 mx-1 border rounded hover:bg-blue-600 hover:cursor-pointer hover:text-white ${currentPage === index + 1 ? 'bg-blue-800 text-white' : 'bg-white text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
