import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlusCircle, FaFile } from "react-icons/fa";
import MainLogo from "../../components/MainLogo";
import Income from "./Income";
import ExpensesContainer from "./Expenses/ExpensesContainer";
import YearMonthSelector from "./YearMonthSelector";
import useExportIncomeExpenses from "../../hooks/IncomeExpenses/useExportIncomeExpenses";

const Expenses = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month

  const { loading, error, exportReport } = useExportIncomeExpenses(); // Initialize the hook

  const handleGenerateReport = () => {
    exportReport(year, month);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <MainLogo />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-green rounded-lg p-6">
        <div className="p-4 rounded-lg  bg-opacity-10">
          {/* TITLE and DATE */}
          <div className="p-4 rounded-lg justify-between flex bg-primary bg-opacity-15 mb-2">
            <div className="w-full max-w-md border-l-8 text-white text-4xl border-b-2 bg-primary bg-opacity-55 border-opacity-60 rounded-xl border-primary p-4">
              <strong>Income and Expenses </strong>
            </div>
            <YearMonthSelector
              year={year}
              month={month}
              onYearChange={setYear}
              onMonthChange={setMonth}
            />
          </div>

          {/* INCOME SECTION */}
          <div>
            <Income year={year} month={month} />
          </div>

          {/* Expense Section */}
          <div className="mt-5">
            <div>
              <ExpensesContainer year={year} month={month} />
            </div>
          </div>

          {/* Generate Report Button */}
          <div className="flex justify-end items-center mt-6">
            <button
              onClick={handleGenerateReport}
              disabled={loading} // Disable button while loading
              className={`${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-secondary"
              } flex items-center bg-mute text-white px-4 py-2 rounded-md`}
            >
              {loading ? "Generating..." : "Generate Report (PDF)"}
              <FaFile className="text-2xl text-white ml-2" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Expenses;
