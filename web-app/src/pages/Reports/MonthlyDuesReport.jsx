import React from "react";
import { FiPrinter } from "react-icons/fi";

const MonthlyDuesReport = () => {
  const sample = [
    {
      name: "John Rey",
      address: "Block 1 Lot 2",
      monthsBehind: 2,
      amount: 100,
    },
  ];

  const handleReviewClick = () => {
    console.log("Review clicked!");
  };

  return (
    <div className="flex w-full h-full">
      <div className="bg-oliveGreen flex-grow p-4">
        <h1 className="text-center p-2 font-bold text-white text-2xl">
          MONTHLY DUE PENDING SUMMARY
        </h1>

        <div className="w-full shadow-lg">
          <div className="flex items-center justify-between font-medium rounded-t-lg bg-mutedGreen p-4 text-center">
            <div className="flex-1">Name</div>
            <div className="flex-1">Address</div>
            <div className="flex-1">Months Behind</div>
            <div className="flex-1">Amount</div>
          </div>
          {sample.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 p-3 border text-white mb-2"
            >
              <div className="text-center">{item.name}</div>
              <div className="text-center">{item.address}</div>
              <div className="text-center">{item.monthsBehind}</div>
              <div className="text-center">{item.amount}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="bg-secondary p-3 flex items-center space-x-2 rounded-md hover:bg-mutedGreen">
            <FiPrinter className="text-2xl mr-2" />
            Print to Pdf
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyDuesReport;
