import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { BiTrendingUp } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import MonthlyDuesIncomeDetails from "./MonthlyDuesIncomeDetails";
import useIncomes from "../../../hooks/IncomeExpenses/useIncomes";

const MonthlyDuesIncome = ({ year, month }) => {
  // Accept year and month as props
  const [showDetails, setShowDetails] = useState(false);
  const { incomes, loading, error, fetchIncomes } = useIncomes();

  // Fetch the incomes whenever the year or month changes
  useEffect(() => {
    fetchIncomes({ year, month });
  }, [fetchIncomes, year, month]); // Dependency on year and month

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formatIncome = (income) => {
    return income && !isNaN(income) ? `₱${income}` : "₱0.00";
  };

  return (
    <div className="p-4 bg-lime-50 rounded-lg shadow-sm w-full max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-green text-white text-lg rounded-full">
            <FiBook />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              Monthly Dues
            </div>
            <div className="text-xs text-gray-500">34 Orders today</div>
          </div>
        </div>
        <div className="text-gray-400 cursor-pointer">•••</div>
      </div>

      <div className="flex items-center justify-between mb-3">
        {loading ? (
          <div className="text-xl font-bold text-gray-800">Loading...</div>
        ) : error ? (
          <div className="text-xl font-bold text-red-600">{error}</div>
        ) : (
          <div className="text-xl font-bold text-gray-800">
            {incomes && incomes.bills ? formatIncome(incomes.bills) : "₱0.00"}
          </div>
        )}
        <div className="flex items-center text-green-500 text-xs font-medium bg-green-100 px-1 py-1 rounded-lg">
          <BiTrendingUp className="mr-1 text-sm" />
          100.00%
        </div>
      </div>

      <hr className="my-3 border-t border-gray-300" />

      <div className="flex items-center justify-between mt-2">
        <div
          className="text-xs font-medium text-green cursor-pointer"
          onClick={toggleDetails}
        >
          See Details
        </div>
        <FiArrowRight className="text-gray-400 text-sm" />
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <MonthlyDuesIncomeDetails onClose={toggleDetails} />
        </div>
      )}
    </div>
  );
};

export default MonthlyDuesIncome;
