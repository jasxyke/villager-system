import React, { useEffect, useState } from "react";

// Mock Data (Replace this with an API call)
const mockBillsData = [
  {
    id: 1,
    resident_id: 101,
    amount: 150.0,
    due_date: "2024-12-10",
    status: "Pending",
    issue_date: "2024-11-15",
  },
  {
    id: 2,
    resident_id: 102,
    amount: 200.0,
    due_date: "2024-12-12",
    status: "Paid",
    issue_date: "2024-11-20",
  },
  // Add more mock data if needed
];

const MonthlyDueIncomeTable = () => {
  const [bills, setBills] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // In a real scenario, you would use something like fetch or axios here to retrieve data from your backend
    setBills(mockBillsData);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Monthly Due Income</h2>

      <div className="flex flex-col border border-gray-300 rounded-lg shadow-md">
        {/* Table Header */}
        <div className="flex bg-gray-100 font-semibold text-center border-b">
          <div className="flex-1 py-2 px-4">Resident ID</div>
          <div className="flex-1 py-2 px-4">Amount</div>
          <div className="flex-1 py-2 px-4">Due Date</div>
          <div className="flex-1 py-2 px-4">Status</div>
          <div className="flex-1 py-2 px-4">Issue Date</div>
        </div>

        {/* Table Body */}
        {bills.map((bill) => (
          <div key={bill.id} className="flex text-center border-b">
            <div className="flex-1 py-2 px-4">{bill.resident_id}</div>
            <div className="flex-1 py-2 px-4">${bill.amount.toFixed(2)}</div>
            <div className="flex-1 py-2 px-4">
              {new Date(bill.due_date).toLocaleDateString()}
            </div>
            <div className="flex-1 py-2 px-4">{bill.status}</div>
            <div className="flex-1 py-2 px-4">
              {new Date(bill.issue_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyDueIncomeTable;
