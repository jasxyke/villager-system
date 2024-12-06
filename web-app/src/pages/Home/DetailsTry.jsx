import React from "react";

const DetailsTry = ({ onClose }) => {
  // Sample data for transaction history or income
  const transactions = [
    { id: 1, date: "2024-12-01", source: "Rent Payment", amount: "$500" },
    { id: 2, date: "2024-12-05", source: "Maintenance Fee", amount: "$150" },
    { id: 3, date: "2024-12-10", source: "Parking Fee", amount: "$75" },
    { id: 4, date: "2024-12-15", source: "Utility Payment", amount: "$120" },
  ];

  return (
    <div className="bg-white p-6 w-full max-w-6xl left-32 h-auto text-black rounded-lg relative overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Details Information</h2>
      <p className="mb-4">
        Below is a summary of the transaction history for the income received:
      </p>

      {/* Transaction History Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-2 text-left">Date</th>
            <th className="border-b-2 px-4 py-2 text-left">Source</th>
            <th className="border-b-2 px-4 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border-b px-4 py-2">{transaction.date}</td>
              <td className="border-b px-4 py-2">{transaction.source}</td>
              <td className="border-b px-4 py-2">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Close Button */}
      <button
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default DetailsTry;
