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

const getStatusOptions = () => [
  { value: "", label: "Status" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

const TransactionFilter = () => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-4">
        {/* Year Filter */}
        <div className="flex flex-col w-full sm:w-auto">
          <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Year</option>
            {getYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div className="flex flex-col w-full sm:w-auto">
          <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Month</option>
            {getMonthOptions().map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col w-full sm:w-auto">
          <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Date</option>
            {getDateOptions().map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col w-full sm:w-auto">
          <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {getStatusOptions().map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;
