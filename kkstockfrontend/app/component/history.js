'use client';

import { useSelector } from 'react-redux';

export default function HistoryComponent() {
  const { transactions } = useSelector((state) => state.transactions); // Assuming transactions are in Redux

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      {transactions.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{transaction.type}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.productName}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">₹{transaction.price}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}
