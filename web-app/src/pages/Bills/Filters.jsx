import React from "react";
import { CiSearch } from "react-icons/ci";

const Filters = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Year Dropdown */}
      <div>
        <select className="w-full p-2 border rounded bg-white text-black">
          <option>Year</option>
          <option>2024</option>
          <option>2025</option>
          <option>2026</option>
        </select>
      </div>

      {/* Month Dropdown */}
      <div>
        <select className="w-full p-2 border rounded bg-white text-black">
          <option>Month</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
        </select>
      </div>

      {/* Status Dropdown */}
      <div>
        <select className="w-full p-2 border rounded bg-white text-black">
          <option>Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="flex items-end">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded pr-10 bg-white text-black"
          />
          <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
