import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlusCircle } from "react-icons/fa";
import MainLogo from "../../components/MainLogo";
import { FaFile } from "react-icons/fa";
import Income from "./Income";
import ExpensesContainer from "./Expenses/ExpensesContainer";
import YearMonthSelector from "./YearMonthSelector";

const Expenses = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <MainLogo />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl bg-green rounded-lg p-6">
        <div className="bg-lime-50 p-5 rounded-lg mb-10 justify-between flex">
          {/* Year and Month Selector Component */}
          <div className="text-3xl text-primary lg:text-4xl font-semibold mb-4 lg:mb-0">
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
        <div className="mt-10">
          <div>
            <ExpensesContainer year={year} month={month} />
          </div>
        </div>

        {/* Generate Report Button */}
        <div className="flex justify-end items-center mt-6">
          <button className="bg-secondary flex items-center bg-mute text-white px-4 py-2 rounded-md">
            Generate Report (Excel)
            <FaFile className="text-2xl text-white ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
