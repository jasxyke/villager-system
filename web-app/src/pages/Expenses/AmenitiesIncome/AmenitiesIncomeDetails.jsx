import React, { useState, useEffect } from "react";
import useIncomes from "../../../hooks/IncomeExpenses/useIncomes";
import YearMonthSelector from "../YearMonthSelector";

const AmenitiesIncomeDetails = ({ onClose }) => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const { incomes, loading, error, fetchIncomes } = useIncomes();

  useEffect(() => {
    // Fetch the amenities income data when year and month change
    fetchIncomes({ year, month });
  }, [fetchIncomes, year, month]);

  const formatIncome = (income) => {
    return income && !isNaN(income) ? `₱${income}` : "₱0.00";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl left-36">
      <div>
        {/* Back Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-white w-10 h-10 bg-gray-200 p-4 rounded-full flex items-center justify-center hover:bg-black"
            onClick={onClose} // Call the function passed as a prop
          >
            X
          </button>
        </div>
      </div>

      <div>
        <hr className="border-2 border-green" />
      </div>

      <div className="flex justify-between">
        {/* Amenities Income Data */}
        <div className="text-4xl p-4 justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : incomes ? (
            <div>
              <div className="mb-2">
                <strong>Total Amenities Income:</strong>{" "}
                {formatIncome(incomes.bookings)}
              </div>
            </div>
          ) : (
            <div>No data available</div>
          )}
        </div>
        {/* Year and Month Selection Component */}
        <div className="p-4">
          <YearMonthSelector
            year={year}
            month={month}
            onYearChange={setYear}
            onMonthChange={setMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default AmenitiesIncomeDetails;
