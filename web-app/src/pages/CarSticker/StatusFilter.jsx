import React, { useState } from "react";

const getStatus = () => ["Completed", "In Progress", "Rejected"];

const StatusFilter = () => {
  return (
    <div className="flex px-4 flex-1">
      <div className="flex items-center gap-2">
        <select className="flex-grow p-2 border border-gray-300 rounded-md">
          <option value="">Status</option>
          {getStatus().map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatusFilter;
