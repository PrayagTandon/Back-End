import React, { useState, useEffect } from 'react';

const Transactions = ({ transactions = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 8;
    const [currentTransactions, setCurrentTransactions] = useState([]);

    // Calculate total pages and guard against overflows
    const totalPages = Math.max(1, Math.ceil(transactions.length / transactionsPerPage));

    // Debugging: log data to confirm received transactions
    console.log("Total Transactions:", transactions.length);
    console.log("Current Page:", currentPage, "Total Pages:", totalPages);

    useEffect(() => {
        if (Array.isArray(transactions) && transactions.length > 0) {
            const indexOfLastTransaction = currentPage * transactionsPerPage;
            const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
            setCurrentTransactions(transactions.slice(indexOfFirstTransaction, indexOfLastTransaction));
        } else {
            setCurrentTransactions([]);
        }
    }, [transactions, currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate a limited range of pagination buttons
    const paginationButtons = Array.from(
        { length: Math.min(totalPages, 5) },
        (_, i) => i + currentPage - Math.floor(5 / 2)
    ).filter(page => page > 0 && page <= totalPages);

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
                {paginationButtons.map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 mx-1 border rounded hover:bg-blue-600 hover:cursor-pointer hover:text-white ${currentPage === page ? 'bg-blue-800 text-white' : 'bg-white text-black'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
