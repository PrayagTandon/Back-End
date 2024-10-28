// BlockDetails.jsx

import React from 'react';

const BlockDetails = ({ transactionHash, from, to, amount, status, gasUsed }) => {
    return (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md border-4 border-yellow-600">
            <h2 className="text-lg font-bold mb-4">Transaction Details</h2>
            <table className="min-w-full text-left text-sm">
                <tbody className='flex flex-col gap-3 justify-center'>
                    <tr className='flex items-center gap-1'>
                        <td className="font-medium">Transaction Hash:</td>
                        <td>{transactionHash}</td>
                    </tr>
                    <tr className='flex items-center gap-1'>
                        <td className="font-medium">From:</td>
                        <td>{from}</td>
                    </tr>
                    <tr className='flex items-center gap-1'>
                        <td className="font-medium">To:</td>
                        <td>{to}</td>
                    </tr>
                    <tr className='flex items-center gap-1'>
                        <td className="font-medium">Amount:</td>
                        <td>{amount} ETH</td>
                    </tr>
                    <tr className='flex items-center gap-1'>
                        <td className="font-medium">Status:</td>
                        <td>{status}</td>
                    </tr>
                    {gasUsed && (
                        <tr className='flex items-center gap-1'>
                            <td className="font-medium">Gas Used:</td>
                            <td>{gasUsed}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BlockDetails;
