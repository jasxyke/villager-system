import React from "react";

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => currentYear - i);
};

const getMonthOptions = () => [
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

const getDateOptions = () => Array.from({ length: 31 }, (_, i) => i + 1);

const Filter = () => {
  return (
    <div className="">
      <div className="flex gap-4">
        {/* Year Filter */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <select className="flex-grow p-2 border border-gray-300 rounded-md">
              <option value="">Year</option>
              {getYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Month Filter */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <select className="flex-grow p-2 border border-gray-300 rounded-md">
              <option value="">Month</option>
              {getMonthOptions().map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <select className="flex-grow p-2 border border-gray-300 rounded-md">
              <option value="">Date</option>
              {getDateOptions().map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
