import React from "react";

const transactions = [
  {
    date: "2024-08-01",
    status: "Unpaid",
    name: "John Doe",
    unpaid: "1000",
  },
  {
    date: "2024-08-05",
    unpaid: "1200",
    status: "Unpaid",
    name: "Jane Smith",
  },
  {
    date: "2024-08-10",
    unpaid: "1500",
    status: "Unpaid",
    name: "Alice Johnson",
  },
  // Add more sample transactions as needed
];

const Reminders = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 bg-oliveGreen text-white font-semibold py-2 px-4 rounded-t">
        <div>Homeowner</div>
        <div>Status</div>
        <div>Pending Payment</div>
        <div>Action</div>
      </div>
      <div className="divide-y divide-gray-300">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 gap-4 p-4 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } hover:bg-gray-100`}
          >
            <div>{transaction.name}</div>
            <div>{transaction.status}</div>
            <div>{transaction.unpaid}</div>
            <div>
              <button className="text-white bg-oliveGreen rounded-xl w-28 p-2 hover:underline">
                Notify
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;
