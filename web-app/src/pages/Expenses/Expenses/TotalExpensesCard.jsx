import React, { useState } from "react";
import { FaWallet, FaPlus } from "react-icons/fa";

const TotalExpensesCard = ({ totalExpenses, onAddExpenseClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="cursor-pointer mb-2 flex justify-between items-center gap-6 border-b-2 border-l-8 bg-primary bg-opacity-45 border-opacity-50 rounded-2xl border-primary hover:bg-darkerGreen hover:border-primary hover:border-b-4 hover:border-opacity-90 hover:bg-opacity-70 p-4 shadow-lg transform hover:scale-105 transition-transform">
      {/* Left Section: Title and Main Value */}
      <div>
        <div className="text-xl font-medium text-white">Total Expenses</div>
        <div className="text-5xl font-extrabold text-white opacity-90">
          ₱{totalExpenses}
        </div>
      </div>

      {/* Add Expense Button */}
      <div
        className="bg-white text-green rounded-2xl p-4 border-l-4  bg-opacity-95 border-opacity-50 border-primary hover:bg-mutedGreen hover:border-primary hover:border-b-2 hover:border-opacity-90 hover:bg-opacity-70 shadow-lg hover:scale-105  transform hover:rotate-12 transition-all duration-300 ease-in-out"
        onClick={onAddExpenseClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <FaPlus className="text-4xl text-primary" />
        ) : (
          <FaWallet className="text-4xl" />
        )}
      </div>
    </div>
  );
};

export default TotalExpensesCard;
