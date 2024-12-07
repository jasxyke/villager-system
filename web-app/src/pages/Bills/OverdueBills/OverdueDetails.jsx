import React from "react";

const OverdueDetails = () => (
  <div className="container mx-auto p-4">
    {/* Brute force overdue details */}
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <div className="text-black">Monthly Bills:</div>
        <div className=" text-black">₱1000.00</div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="text-black">Number of Overdue Months:</div>
        <div className=" text-black">8 months</div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="text-black">Accrued Interest (5% monthly):</div>
        <div className=" text-black">5% per month</div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="text-black">Resident Status:</div>
        <div className=" text-red-500">Overdue (Extreme)</div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="text-black">Last Payment Date:</div>
        <div className=" text-black">March 15, 2024 (8 months ago)</div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="text-black">Outstanding Principal Amount:</div>
        <div className=" text-black">₱8000.00</div>
      </div>
      <div className="flex justify-between text-sm pt-4 border-t-2 border-b-2 pb-4 pl-2">
        <div className="text-black font-bold">Total Amount to pay:</div>
        <div className="font-bold text-black">₱15,000</div>
      </div>
    </div>
  </div>
);

export default OverdueDetails;
