import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";

const Filters = ({ onFiltersChange, handleSearchPress, filter }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JavaScript Date, so add 1
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [status, setStatus] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [cols, setCols] = useState(5);
  useEffect(() => {
    onFiltersChange({ year, month, status, searchQuery });
  }, [year, month, status, searchQuery]);

  useEffect(() => {
    if (filter === "transactionHistory") {
      setCols(4);
    }
  }, [filter]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4`}>
      {/* Year Dropdown */}
      <div>
        <select
          value={year}
          onChange={handleYearChange}
          className="w-full p-2 border rounded bg-white text-black"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Month Dropdown */}
      <div>
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-full p-2 border rounded bg-white text-black"
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>

      {/* Status Dropdown */}
      {filter !== "transactionHistory" ? (
        <div>
          <select
            value={status}
            onChange={handleStatusChange}
            className="w-full p-2 border rounded bg-white text-black"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      ) : null}

      {/* Search Bar */}
      <div className="flex items-end">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearchPress();
              }
            }}
            placeholder="Search..."
            className="w-full p-2 border rounded pr-10 bg-white text-black"
          />
          {searchQuery === "" ? (
            <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
          ) : (
            <MdClear
              onClick={handleClear}
              className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
            />
          )}
        </div>
      </div>
      <button
        className="bg-secondary p-2 text-white"
        onClick={handleSearchPress}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
