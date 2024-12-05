import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { BiTrendingUp } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import MonthlyDuesIncomeDetails from "../Details/MonthlyDuesIncomeDetails";

const MonthlyDuesIncome = () => {
  const [showDetails, setShowDetails] = useState(false); // Manage visibility state

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggle the state
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm w-full max-w-xs">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        {/* Icon and text */}
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
        {/* Options menu */}
        <div className="text-gray-400 cursor-pointer">•••</div>
      </div>

      {/* Amount and percentage */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xl font-bold text-gray-800">₱10000.00</div>
        <div className="flex items-center text-green-500 text-xs font-medium bg-green-100 px-1 py-1 rounded-lg">
          <BiTrendingUp className="mr-1 text-sm" />
          100.00%
        </div>
      </div>

      {/* Horizontal line separating sections */}
      <hr className="my-3 border-t border-gray-300" />

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-2">
        <div
          className="text-xs font-medium text-blue-600 cursor-pointer"
          onClick={toggleDetails} // Handle click to toggle details
        >
          See Details
        </div>
        <FiArrowRight className="text-gray-400 text-sm" />
      </div>

      {/* Conditionally render MonthlyDuesIncomeDetails component as a full-page overlay */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <MonthlyDuesIncomeDetails onClose={toggleDetails} />{" "}
          {/* Pass toggle function to close */}
        </div>
      )}
    </div>
  );
};

export default MonthlyDuesIncome;
