import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Transactions from './components/Transactions';
import Transfer from './components/Transfer';
import Blocks from './components/Blocks';
import { generateMockEthereumData } from './components/MockData';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    const mockData = generateMockEthereumData(50);
    setTransactions(mockData);
    setLatestBlocks(mockData.slice(0, 2)); // Show only two latest blocks
  }, []);

  // Function to add a new transaction from the Transfer form
  const addNewTransaction = (newTransaction) => {
    setTransactions((prevTx) => [newTransaction, ...prevTx]);
    setLatestBlocks((prevBlocks) => [newTransaction, ...prevBlocks.slice(0, 1)]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Navigation />

        {/* Define Routes */}
        <div className="p-6">
          <Routes>
            <Route
              path="/transactions"
              element={<Transactions transactions={transactions} />}
            />
            <Route
              path="/transfer"
              element={<Transfer addNewTransaction={addNewTransaction} availableAddresses={transactions.map((tx) => tx.from)} />}
            />
            <Route
              path="/blocks"
              element={<Blocks transactions={transactions} />}
            />
            {/* You can add a new route for Dashboard if needed */}
            <Route
              path="/dashboard"
              element={
                <div>
                  <h2 className="text-xl font-bold">Blockchain Overview</h2>
                  {/* Display latest blocks here */}
                  <ul>
                    {latestBlocks.map((block, index) => (
                      <li key={index} className="border p-2 rounded">
                        <strong>Transaction Hash:</strong> {block.transactionHash} <br />
                        <strong>From:</strong> {block.from} <br />
                        <strong>To:</strong> {block.to} <br />
                        <strong>Amount:</strong> {block.amount} ETH
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
