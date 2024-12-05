import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { BiTrendingDown } from "react-icons/bi";
import { FiTag } from "react-icons/fi";

const StickersIncome = () => {
  return (
    <div className="p-4 bg-white rounded-lg w-full max-w-xs shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3">
        {/* Icon and text */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-green text-white text-lg rounded-full">
            <FiTag />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800">
              Stickers Income
            </div>
            <div className="text-xs text-gray-500">12 Orders today</div>
          </div>
        </div>
        {/* Options menu */}
        <div className="text-gray-400 cursor-pointer">•••</div>
      </div>

      {/* Amount and percentage */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-xl font-bold text-gray-800">$89,765</div>
        <div className="flex items-center text-red-500 text-xs font-medium bg-red-100 px-1 py-1 rounded-lg">
          <BiTrendingDown className="mr-1 text-sm" />
          15.23%
        </div>
      </div>

      {/* Horizontal line separating sections */}
      <hr className="my-3 border-t border-gray-300" />

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs font-medium text-blue-600 cursor-pointer">
          See Details
        </div>
        <FiArrowRight className="text-gray-400 text-sm" />
      </div>
    </div>
  );
};

export default StickersIncome;
