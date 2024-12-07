import React, { useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { FiArrowRight, FiBook } from "react-icons/fi";
import AmenitiesIncomeDetails from "./AmenitiesIncomeDetails";

const AmenitiesIncome = ({ loading, incomes, error }) => {
  // Accept year and month as props
  const [showDetails, setShowDetails] = useState(false);

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
              Amenities Income
            </div>
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
            {incomes && incomes.bookings
              ? formatIncome(incomes.bookings)
              : "₱0.00"}
          </div>
        )}
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
          <AmenitiesIncomeDetails onClose={toggleDetails} />
        </div>
      )}
    </div>
  );
};

export default AmenitiesIncome;
