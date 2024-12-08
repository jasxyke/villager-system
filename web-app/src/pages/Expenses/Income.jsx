import React, { useEffect, useState } from "react";
import useIncomes from "../../hooks/IncomeExpenses/useIncomes";
import AmenitiesIncome from "./AmenitiesIncome/AmenitiesIncome";
import ClearanceIncome from "./ClearanceIncome/ClearanceIncome";
import MonthlyDuesIncome from "./MonthlyDuesIncome/MonthlyDuesIncome";
import StickersIncome from "./StickersIncome/StickersIncome";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaPlus } from "react-icons/fa";
import IncomeModal from "./IncomeModal";

const Income = ({ year, month }) => {
  const { incomes, loading, error, fetchIncomes } = useIncomes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchIncomes(year, month);
  }, [year, month]);

  const handleModalOpen = (incomeType) => {
    setSelectedIncomeType(incomeType);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIncomeType(""); // Reset selected income type
  };

  const formatIncome = (income) => {
    return income && !isNaN(income) ? `₱${income}` : "₱0.00";
  };

  return (
    <div className="bg-primary bg-opacity-20 rounded-lg">
      {/* Total Income Section */}
      <div className="pt-4 pl-4 pr-6 flex justify-between items-center ">
        {/* Left Section: Title and Main Value */}
        <div
          className="w-full max-w-xl cursor-pointer border-l-8 bg-primary bg-opacity-45 border-opacity-50 rounded-2xl border-primary hover:bg-darkerGreen hover:border-primary hover:border-b-8 hover:border-opacity-40 hover:bg-opacity-60 p-4 shadow-lg"
          onClick={() => handleModalOpen("Total Income")}
        >
          <div className="text-xl font-medium text-white">Total Income</div>
          <div className="text-5xl font-extrabold text-white opacity-90">
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : error ? (
              <span className="text-red-300">{`Error: ${error.message}`}</span>
            ) : incomes ? (
              formatIncome(incomes.total_income.toFixed(2))
            ) : (
              "₱0.00"
            )}
          </div>
        </div>

        {/* Add Income Button */}
        <div
          className="bg-white text-green rounded-lg p-6 shadow-lg transform hover:rotate-12 hover:bg-gray-300 transition-all duration-300 ease-in-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <FaPlus className="text-4xl text-secondary" />
          ) : (
            <FcMoneyTransfer className="text-4xl text-green-500" />
          )}
        </div>
      </div>

      {/* Income Components */}
      <div className="">
        <div className="grid grid-cols-4 gap-2">
          <div
            className="p-4 transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleModalOpen("Monthly Dues")}
          >
            <MonthlyDuesIncome
              loading={loading}
              error={error}
              incomes={incomes}
            />
          </div>
          <div
            className="p-4 transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleModalOpen("Clearance Income")}
          >
            <ClearanceIncome
              loading={loading}
              error={error}
              incomes={incomes}
            />
          </div>
          <div
            className="p-4 transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleModalOpen("Amenities Income")}
          >
            <AmenitiesIncome
              loading={loading}
              error={error}
              incomes={incomes}
            />
          </div>
          <div
            className="p-4 transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleModalOpen("Stickers Income")}
          >
            <StickersIncome loading={loading} error={error} incomes={incomes} />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <IncomeModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        incomes={incomes}
        loading={loading}
        error={error}
        incomeType={selectedIncomeType} // Pass selected income type to modal
      />
    </div>
  );
};

export default Income;
