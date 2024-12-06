import React, { useState, useEffect } from "react";
import MonthlyDuesIncome from "./MonthlyDuesIncome/MonthlyDuesIncome";
import ClearanceIncome from "./ClearanceIncome/ClearanceIncome";
import AmenitiesIncome from "./AmenitiesIncome/AmenitiesIncome";
import StickersIncome from "./StickersIncome/StickersIncome";
import useIncomes from "../../hooks/IncomeExpenses/useIncomes";
import YearMonthSelector from "./YearMonthSelector";

const Income = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month

  // Using the useIncomes hook
  const { incomes, loading, error, fetchIncomes } = useIncomes();

  // Fetch the incomes when the component mounts or when year/month changes
  useEffect(() => {
    fetchIncomes({ year, month });
  }, [year, month, fetchIncomes]);

  const formatIncome = (income) => {
    return income && !isNaN(income) ? `₱${income}` : "₱0.00";
  };

  return (
    <div className="rounded-2xl shadow-xl mb-2">
      <div className="bg-lime-50 rounded-lg flex flex-col lg:flex-row justify-between items-center p-6">
        <div className="text-3xl text-primary lg:text-4xl font-semibold mb-4 lg:mb-0">
          <strong>Total Income:</strong>
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

        {/* Year and Month Selector Component */}
        <YearMonthSelector
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />
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
            <MonthlyDuesIncome year={year} month={month} />
          </div>

          {/* Clearance Income */}
          <div className="">
            <ClearanceIncome year={year} month={month} />
          </div>

          {/* Amenities Income */}
          <div className="">
            <AmenitiesIncome year={year} month={month} />
          </div>

          {/* Stickers Income */}
          <div className="">
            <StickersIncome year={year} month={month} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
