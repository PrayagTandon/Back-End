import React from 'react';

const BlockDetails = ({ from, to, transactionHash, amount, gasUsed }) => {
    // If any required props are missing, display an error message
    if (!from || !to || !transactionHash || !amount) {
        return (
            <div className="bg-red-100 text-red-700 p-4 mt-4 rounded-md">
                Ethereum address is required to view block details.
            </div>
        );
    }

    return (
        <div className="bg-[#0d314b] text-white py-4 px-8 mt-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Block Details</h2>
            <table className="min-w-full text-left text-sm">
                <tbody className='flex flex-col gap-3 items-start justify-center'>
                    <tr className='flex items-center gap-2'>
                        <td className="font-medium">Transaction Hash:</td>
                        <td>{transactionHash}</td>
                    </tr>
                    <tr className='flex items-center gap-2'>
                        <td className="font-medium">From Address:</td>
                        <td>{from}</td>
                    </tr>
                    <tr className='flex items-center gap-2'>
                        <td className="font-medium">To Address:</td>
                        <td>{to}</td>
                    </tr>
                    <tr className='flex items-center gap-2'>
                        <td className="font-medium">Amount:</td>
                        <td>{amount}</td>
                    </tr>
                    <tr className='flex items-center gap-2'>
                        <td className="font-medium">Gas Used:</td>
                        <td>{gasUsed}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BlockDetails;
