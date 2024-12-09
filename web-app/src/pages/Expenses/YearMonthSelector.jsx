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
    <div className="flex items-center gap-6 border-l-8 bg-primary bg-opacity-45 border-opacity-50 rounded-2xl border-primary hover:bg-darkerGreen hover:border-primary hover:border-b-4 hover:border-opacity-90 hover:bg-opacity-70 p-4 shadow-lg">
      {/* Display the selected month and year, along with the calendar icon */}
      {!showSelectors ? (
        <div
          onClick={handleIconClick}
          className="cursor-pointer p-2 rounded-xl transition-all flex items-center space-x-3 "
        >
          <div className="text-lg font-bold text-white">
            {months[currentMonth - 1]} {currentYear}
          </div>
          <FiCalendar className="text-2xl text-white" />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          {/* Month Selector */}
          <div className="relative flex flex-col">
            <legend className="text-xs pl-1 pr-1 rounded-md text-white bg-green left-2 border-2 border-green absolute transform -translate-y-1/2">
              Month
            </legend>
            <select
              id="month"
              value={currentMonth}
              onChange={handleMonthChange}
              className=" bg-white text-black border-primary border-2 p-2 rounded-md shadow-xl focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {months.map((monthName, index) => (
                <option key={index} value={index + 1}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <fieldset className="relative flex flex-col">
            <legend className="text-xs pl-1 pr-1 rounded-md text-white bg-green left-2 border-2 border-green absolute transform -translate-y-1/2">
              {" "}
              Year
            </legend>
            <input
              type="number"
              id="year"
              value={currentYear}
              onChange={handleYearChange}
              className=" bg-white text-black border-green border-2 p-2 rounded-md shadow-xl focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </fieldset>

          {/* Calendar Icon Button */}
          <div
            onClick={handleIconClick}
            className="cursor-pointer text-white text-2xl hover:text-secondary hover:bg-gray-200 rounded-lg p-1"
          >
            <FiCalendar />
          </div>
        </div>
      )}
    </div>
  );
};

export default YearMonthSelector;
