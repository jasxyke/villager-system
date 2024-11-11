import React from "react";
import { FiUser, FiUsers } from "react-icons/fi";

const OngoingBookings = () => {
  return (
    <div className="w-full sm:w-7/12 bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9] rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="p-4 rounded-xl max-h-[60vh] overflow-y-auto border border-gray-300">
        <div className="bg-[#97A97C] p-4 rounded-md text-white font-semibold text-lg">
          ONGOING BOOKINGS
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-6 p-4 bg-white hover:bg-gray-200 cursor-pointer rounded-md shadow-md transition-transform duration-300 transform hover:scale-105">
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-[#97A97C] shadow-md transition-transform duration-300 transform hover:rotate-12 hover:scale-110">
              <FiUser className="text-3xl text-[#E9F5DB]" />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="text-lg font-semibold text-gray-900">
                JOHN REY REBUSQUILLO
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-500">BASKETBALL COURT</div>
                <div className="text-sm text-yellow-600 font-semibold">
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingBookings;
