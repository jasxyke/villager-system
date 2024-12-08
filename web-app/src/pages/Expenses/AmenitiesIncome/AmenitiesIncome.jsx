import React, { useState } from "react";
import { FiArrowRight, FiBook } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";

const AmenitiesIncome = ({ loading, incomes, error }) => {
  const formatIncome = (income) => {
    return income && !isNaN(income) ? `₱${income}` : "₱0.00";
  };

  return (
    <div className="border-l-8 bg-primary bg-opacity-45 border-opacity-50 rounded-2xl border-primary hover:bg-darkerGreen hover:border-primary hover:border-b-8 hover:border-opacity-40 hover:bg-opacity-60 p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-white">Bookings</div>
        </div>
        <div className="text-white cursor-pointer">
          <BiDotsVerticalRounded />
        </div>
      </div>

      {/* AMOUNT */}
      <div className="flex items-center justify-between mb-3">
        {loading ? (
          <div className="text-xl font-bold text-white">Loading...</div>
        ) : error ? (
          <div className="text-xl font-bold text-red-600">{error}</div>
        ) : (
          <div className="text-2xl font-semibold text-white">
            {incomes && incomes.bookings
              ? formatIncome(incomes.bookings)
              : "₱0.00"}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs font-medium text-white cursor-pointer">
          See Details
        </div>
        <FiArrowRight className="text-white text-sm" />
      </div>
    </div>
  );
};

export default AmenitiesIncome;
