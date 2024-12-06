import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";

const YearMonthSelector = ({ year, month, onYearChange, onMonthChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // State to toggle visibility of the month/year selectors
  const [showSelectors, setShowSelectors] = useState(false);

  // State to store the current month and year (if no prop values provided)
  const [currentMonth, setCurrentMonth] = useState(
    month || new Date().getMonth() + 1
  ); // 1-based month
  const [currentYear, setCurrentYear] = useState(
    year || new Date().getFullYear()
  );

  // Update current month and year based on props
  useEffect(() => {
    if (year && month) {
      setCurrentYear(year);
      setCurrentMonth(month);
    }
  }, [year, month]);

  // Toggle the visibility of the month and year selectors
  const handleIconClick = () => {
    setShowSelectors((prev) => !prev);
  };

  const handleMonthChange = (e) => {
    const selectedMonth = parseInt(e.target.value);
    setCurrentMonth(selectedMonth);
    onMonthChange(selectedMonth);
  };

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setCurrentYear(selectedYear);
    onYearChange(selectedYear);
  };

  return (
    <div className="flex items-center gap-6">
      {/* Display the selected month and year, along with the calendar icon */}
      {!showSelectors ? (
        <>
          <div className="text-lg font-semibold text-gray-700">
            {months[currentMonth - 1]} {currentYear}
          </div>
          <div
            onClick={handleIconClick}
            className="cursor-pointer p-3 rounded-lg hover:bg-gray-200 transition-all"
          >
            <FiCalendar className="text-2xl text-gray-700" />
          </div>
        </>
      ) : (
        <>
          {/* Display the month and year selectors */}
          <div className="flex flex-col">
            <label
              htmlFor="month"
              className="text-sm font-semibold text-gray-300 mb-1"
            >
              Month
            </label>
            <select
              id="month"
              value={currentMonth}
              onChange={handleMonthChange}
              className="bg-white text-gray-800 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {months.map((monthName, index) => (
                <option key={index} value={index + 1}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col ml-4">
            <label
              htmlFor="year"
              className="text-sm font-semibold text-gray-300 mb-1"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              value={currentYear}
              onChange={handleYearChange}
              className="bg-white text-gray-800 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div
            onClick={handleIconClick}
            className="cursor-pointer ml-4 text-gray-500 text-lg"
          >
            <FiCalendar />
          </div>
        </>
      )}
    </div>
  );
};

export default YearMonthSelector;
