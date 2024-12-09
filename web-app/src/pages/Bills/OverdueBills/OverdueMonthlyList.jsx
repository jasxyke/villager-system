import React from "react";

const OverdueMonthlyList = () => {
  const monthlyData = [
    { month: "Feb", amount: "₱1,000", fee: "₱10", total: "₱1,010" },
    { month: "Mar", amount: "₱1,000", fee: "₱50", total: "₱1,050" },
    { month: "Apr", amount: "₱1,000", fee: "₱100", total: "₱1,100" },
  ];

  return (
    <div className="mb-8 mt-5 p-2">
      {/* Monthly Breakdown */}
      <div className="text-lg font-bold text-black">Unpaid Dues Breakdown</div>

      <div className="overflow-x-auto p-4">
        {/* Header Row */}
        <div className="text-center bg-green text-white">
          <div className="p-3 text-sm font-semibold">
            <div className="flex justify-center">
              <div className="flex-1 text-center">Month</div>
              <div className="flex-1 text-center">Amount</div>
              <div className="flex-1 text-center">Fee/Interest</div>
              <div className="flex-1 text-center">Total</div>
            </div>
          </div>
        </div>

        {/* Data Rows */}
        <div>
          {monthlyData.map((row, index) => (
            <div
              key={row.month}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-colors`}
            >
              <div className="flex justify-center p-3 text-gray-700">
                <div className="flex-1 text-center">{row.month}</div>
                <div className="flex-1 text-center">{row.amount}</div>
                <div className="flex-1 text-center">{row.fee}</div>
                <div className="flex-1 text-center font-semibold">
                  {row.total}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverdueMonthlyList;
