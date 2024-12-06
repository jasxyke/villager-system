import React, { useEffect } from "react";
import useIncomes from "../../hooks/IncomeExpenses/useIncomes";
import AmenitiesIncome from "./AmenitiesIncome/AmenitiesIncome";
import ClearanceIncome from "./ClearanceIncome/ClearanceIncome";
import MonthlyDuesIncome from "./MonthlyDuesIncome/MonthlyDuesIncome";
import StickersIncome from "./StickersIncome/StickersIncome";

const Income = ({ year, month }) => {
  // Using the useIncomes hook
  const { incomes, loading, error, fetchIncomes } = useIncomes();

  // Fetch the incomes when the component mounts or when year/month changes
  useEffect(() => {
    fetchIncomes(year, month);
  }, [year, month]);

  const formatIncome = (income) => {
    return income && !isNaN(income) ? `₱${income}` : "₱0.00";
  };

  return (
    <div className="rounded-2xl shadow-xl mb-2">
      <div className="bg-lime-50 rounded-lg flex flex-col lg:flex-row justify-between items-center p-6">
        <div className="text-3xl text-primary lg:text-4xl font-semibold mb-4 lg:mb-0">
          Total Income:
          <div className="mt-2 text-2xl font-bold">
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : error ? (
              <span className="text-red-300">{`Error: ${error.message}`}</span>
            ) : incomes ? (
              formatIncome(incomes.total_income.toFixed(2)) // Ensure two decimal places
            ) : (
              "₱0.00"
            )}
          </div>
        </div>
      </div>
      {/* 
      <div>
        <hr className="border-2 border-green" />
      </div> */}

      {/* INCOME COMPONENTS */}
      <div className=" rounded-lg mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Monthly Dues */}
          <div className="">
            <MonthlyDuesIncome
              loading={loading}
              error={error}
              incomes={incomes}
            />
          </div>

          {/* Clearance Income */}
          <div className="">
            <ClearanceIncome
              loading={loading}
              error={error}
              incomes={incomes}
            />
          </div>

          {/* Amenities Income */}
          <div className="">
            <AmenitiesIncome
              loading={loading}
              error={error}
              incomes={incomes}
            />
          </div>

          {/* Stickers Income */}
          <div className="">
            <StickersIncome loading={loading} error={error} incomes={incomes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
