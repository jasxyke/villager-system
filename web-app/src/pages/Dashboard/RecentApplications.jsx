import React from "react";
import { FiUser, FiUsers } from "react-icons/fi";

const RecentApplications = () => {
  return (
    <div className="w-full border p-3 rounded-xl shadow-lg bg-gradient-to-r from-green to-green">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-semibold text-white">
          Recent Applications
        </h2>
        <button className="text-white font-semibold cursor-pointer hover:underline transition duration-200">
          See All
        </button>
      </div>

      <div className="flex items-center rounded-lg bg-oliveGreen text-white font-medium mb-2 px-6 py-3">
        <div className="flex-1 text-center">Name</div>
        <div className="flex-1 text-center">Date</div>
        <div className="flex-1 text-center">Type</div>
        <div className="flex-1 text-center">Status</div>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-[#F5FAF3] hover:shadow-md transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex-1 text-center text-gray-800 font-medium flex items-center justify-center gap-2">
              <FiUser className="text-[#87986A] text-lg" />
              John Rey Rebusquillo
            </div>
            <div className="flex-1 text-center text-gray-600">10/12/2024</div>
            <div className="flex-1 text-center text-gray-600">
              PERMIT APPLICATION
            </div>
            <div className="flex-1 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-600">
                Pending
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;
