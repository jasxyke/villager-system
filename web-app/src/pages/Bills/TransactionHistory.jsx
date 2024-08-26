import React from "react";

const transactions = [
  {
    date: "2024-08-01",
    amount: "$200",
    status: "Completed",
    name: "John Doe",
    issuedate: "2024-09-01",
  },
  {
    date: "2024-08-05",
    amount: "$150",
    status: "Pending",
    name: "Jane Smith",
    issuedate: "2024-10-01",
  },
  {
    date: "2024-08-10",
    amount: "$180",
    status: "Completed",
    name: "Alice Johnson",
    issuedate: "2024-08-01",
  },
  // Add more sample transactions as needed
];

const TransactionHistory = () => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4 bg-oliveGreen text-white font-semibold py-2 px-4 rounded-t">
        <div>Homeowner</div>
        <div>Amount</div>
        <div>Due Date</div>
        <div>Status</div>
        <div>Issue Date</div>
      </div>
      <div className="divide-y divide-gray-300">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 gap-4 p-4 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100`}
          >
            <div>{transaction.name}</div>
            <div>{transaction.date}</div>
            <div>{transaction.amount}</div>
            <div>{transaction.status}</div>
            <div>{transaction.issuedate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
