import React from "react";

const OverdueMonthlyList = ({ unpaidDues }) => {
  // Map unpaid dues into a format suitable for rendering
  const monthlyData = unpaidDues.map((due) => ({
    month: new Date(due.due_date).toLocaleString("default", {
      month: "long", // Changed to "long" for full month name
      year: "numeric",
    }),
    amount: `₱${parseFloat(due.amount).toFixed(2)}`,
  }));

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
            </div>
          </div>
        </div>

        {/* Data Rows */}
        <div>
          {monthlyData.length > 0 ? (
            monthlyData.map((row, index) => (
              <div
                key={`${row.month}-${index}`}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <div className="flex justify-center p-3 text-gray-700">
                  <div className="flex-1 text-center">{row.month}</div>
                  <div className="flex-1 text-center">{row.amount}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">
              No unpaid dues available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverdueMonthlyList;
