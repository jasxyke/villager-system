import React from "react";

const MonthlyIncomeTable = () => {
  return (
    <div className="p-4 bg-green rounded-md">
      <div className="flex justify-between text-sm sm:text-base p-2">
        <div>MONTHLY INCOME</div>
        <div>AS OF NOVEMBER 1 - PRESENT</div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-3xl sm:text-5xl">PHP CURRENT INCOME</div>
        <div className="bg-mutedGreen p-2 rounded-md text-xs sm:text-sm">
          reports
        </div>
      </div>

      <div className="text-lg sm:text-2xl mt-4 text-mutedGreen">
        <div>PHP CURRENT EXPENSES</div>
      </div>
    </div>
  );
};

export default MonthlyIncomeTable;
