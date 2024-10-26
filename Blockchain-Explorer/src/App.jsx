import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import Transactions from './components/Transactions';
import Transfer from './components/Transfer';
import Blocks from './components/Blocks';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/history');
        setTransactions(response.data);
        setLatestBlocks(response.data.slice(0, 2));  // Show only the latest two blocks
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Function to add a new transaction (used in Transfer component)
  const addNewTransaction = async (newTransaction) => {
    try {
      const response = await axios.post('/api/transfer', newTransaction);
      const savedTransaction = response.data;

      // Update state after successful save
      setTransactions((prev) => [savedTransaction, ...prev]);
      setLatestBlocks((prev) => [savedTransaction, ...prev.slice(0, 1)]);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Navigation />

        {/* Define Routes */}
        <div className="p-6">
          <Routes>
            <Route path="/transactions" element={<Transactions transactions={transactions} />} />
            <Route
              path="/transfer"
              element={
                <Transfer
                  addNewTransaction={addNewTransaction}
                  availableAddresses={(Array.isArray(transactions) ? transactions : []).map((tx) => tx.from)}
                />
              }
            />

            <Route path="/blocks" element={<Blocks transactions={transactions} />} />
            <Route path="/dashboard" element={
              <div>
                <h2 className="text-xl font-bold">Blockchain Overview</h2>
                <ul>
                  {(Array.isArray(latestBlocks) ? latestBlocks : []).map((block, index) => (
                    <li key={index} className="border p-2 rounded">
                      <strong>Transaction Hash:</strong> {block.transactionHash} <br />
                      <strong>From:</strong> {block.from} <br />
                      <strong>To:</strong> {block.to} <br />
                      <strong>Amount:</strong> {block.amount} ETH
                    </li>
                  ))}
                </ul>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
