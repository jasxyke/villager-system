import React, { useState } from "react";
import OverdueViewDetails from "./OverdueViewDetails";
import { FaRegEye } from "react-icons/fa";

const OverdueBills = () => {
  const [selectedBill, setSelectedBill] = useState(null);

  const overdueData = [
    {
      name: "John Doe",
      overdueMonths: "January - May",
      numberOfOverdue: 5,
      amount: 500,
      action: "Send Reminder",
    },
    {
      name: "Jane Smith",
      overdueMonths: "April - May",
      numberOfOverdue: 2,
      amount: 200,
      action: "Follow Up Email",
    },
    {
      name: "Alice Johnson",
      overdueMonths: "January - June",
      numberOfOverdue: 1,
      amount: 1500,
      action: "Final Notice",
    },
    {
      name: "Bob Brown",
      overdueMonths: "October - November",
      numberOfOverdue: 3,
      amount: 300,
      action: "Call Customer",
    },
    {
      name: "Charlie White",
      overdueMonths: "January - June",
      numberOfOverdue: 4,
      amount: 1200,
      action: "Suspension Notice",
    },
    {
      name: "Mary Lee",
      overdueMonths: "October - November",
      numberOfOverdue: 2,
      amount: 400,
      action: "Send Reminder",
    },
    {
      name: "David Green",
      overdueMonths: "January - May",
      numberOfOverdue: 1,
      amount: 50,
      action: "No Action",
    },
  ];

  const handleViewClick = (bill) => setSelectedBill(bill);
  const handleBack = () => setSelectedBill(null);

  if (selectedBill)
    return <OverdueViewDetails bill={selectedBill} onBack={handleBack} />;

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {/* Header row */}
        <div className="grid grid-cols-6 bg-oliveGreen text-white font-semibold p-4">
          <div className="text-left px-2">Homeowners</div>
          <div className="text-left px-2">Overdue Months</div>
          <div className="text-center px-2">No. of months</div>
          <div className="text-center px-2">Amount</div>
          <div className="text-center px-2">Accrued Interest</div>
          <div className="text-center px-2">Action</div>
        </div>

        {/* Data rows */}
        <div className="divide-y">
          {overdueData.map((bill, index) => (
            <div
              key={index}
              className={`grid grid-cols-6 p-2 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-green-100`}
            >
              <div className="text-center p-2">{bill.name}</div>
              <div className="text-center p-2">{bill.overdueMonths}</div>
              <div className="text-center p-2">{bill.numberOfOverdue}</div>
              <div className="text-center p-2">${bill.amount}</div>
              <div className="text-center p-2">${bill.amount}</div>{" "}
              {/* Fee/Interest */}
              <div className="text-center ">
                <button
                  className="bg-green p-2 text-white rounded-lg hover:bg-secondary w-20"
                  onClick={() => handleViewClick(bill)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverdueBills;
