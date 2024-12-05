import React from "react";

const DateRangeSelector = ({
  selectedStartDay,
  selectedStartMonth,
  selectedStartYear,
  selectedEndDay,
  selectedEndMonth,
  selectedEndYear,
  onStartDayChange,
  onStartMonthChange,
  onStartYearChange,
  onEndDayChange,
  onEndMonthChange,
  onEndYearChange,
}) => {
  // Get the current month days (e.g., February can have 28 or 29 days)
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Month names
  const monthNames = [
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

  // Get available months (0-11 for months January to December)
  const months = Array.from({ length: 12 }, (_, i) => i);
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  ); // Past 10 years

  const daysInStartMonth = getDaysInMonth(
    selectedStartMonth,
    selectedStartYear
  );
  const daysInEndMonth = getDaysInMonth(selectedEndMonth, selectedEndYear);

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-6 items-center text-black p-4 bg-white rounded-lg shadow-md">
      {/* Start Date */}
      <div className="flex items-center mb-4 sm:mb-0">
        <label htmlFor="start-date" className="mr-2 text-lg font-semibold">
          From:
        </label>

        {/* Month Dropdown */}
        <select
          id="start-month"
          value={selectedStartMonth}
          onChange={onStartMonthChange}
          className="bg-green text-white p-2 rounded mx-2"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>

        {/* Day Dropdown */}
        <select
          id="start-day"
          value={selectedStartDay}
          onChange={onStartDayChange}
          className="bg-green text-white p-2 rounded mx-2"
        >
          {Array.from({ length: daysInStartMonth }, (_, i) => i + 1).map(
            (day) => (
              <option key={day} value={day}>
                {day}
              </option>
            )
          )}
        </select>

        {/* Year Dropdown */}
        <select
          id="start-year"
          value={selectedStartYear}
          onChange={onStartYearChange}
          className="bg-green text-white p-2 rounded mx-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* End Date */}
      <div className="flex items-center">
        <label htmlFor="end-date" className="mr-2 text-lg font-semibold">
          To:
        </label>

        {/* Month Dropdown */}
        <select
          id="end-month"
          value={selectedEndMonth}
          onChange={onEndMonthChange}
          className="bg-green text-white p-2 rounded mx-2"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>

        {/* Day Dropdown */}
        <select
          id="end-day"
          value={selectedEndDay}
          onChange={onEndDayChange}
          className="bg-green text-white p-2 rounded mx-2"
        >
          {Array.from({ length: daysInEndMonth }, (_, i) => i + 1).map(
            (day) => (
              <option key={day} value={day}>
                {day}
              </option>
            )
          )}
        </select>

        {/* Year Dropdown */}
        <select
          id="end-year"
          value={selectedEndYear}
          onChange={onEndYearChange}
          className="bg-green text-white p-2 rounded mx-2"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateRangeSelector;
