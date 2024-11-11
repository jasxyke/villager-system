import React from "react";
import MainLogo from "../../components/MainLogo";
import { FiUser, FiUsers } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";
import LoadingPage from "../../components/LoadingScreen/LoadingPage";
import { TbCalendarCheck } from "react-icons/tb";

const AdminDashboard = () => {
  const [totalResidents, setTotalResidents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  // useEffect(() => {
  //   axiosClient
  //     .get("/total-residents")
  //     .then((response) => {
  //       setTotalResidents(response.data.total_residents);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError("Failed to fetch total residents");
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex p-28">
  //       <LoadingPage />
  //     </div>
  //   );
  // }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="pt-10">
        <MainLogo />
      </div>
      <div className="flex p-2">
        <div className="flex flex-row items-center bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9] p-8 w-full max-w-sm cursor-pointer mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center bg-[#97A97C] p-6 rounded-full shadow-md transform hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out">
            <FiHome className="text-5xl text-[#E9F5DB]" />
          </div>

          <div className="flex flex-col flex-grow items-start pl-8 space-y-2">
            <h2 className="text-6xl font-bold text-[#718355] tracking-tight">
              {totalResidents}
            </h2>
            <p className="text-sm text-[#87986A] uppercase font-semibold tracking-wider">
              Total Residents
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9] p-8 w-full max-w-sm cursor-pointer mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center bg-[#97A97C] p-6 rounded-full shadow-md transform hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out">
            <FiUsers className="text-5xl text-[#E9F5DB]" />
          </div>
          <div className="flex flex-col flex-grow items-start pl-8 space-y-2">
            <h2 className="text-6xl font-bold text-[#718355] tracking-tight">
              {unpaidCount}
            </h2>
            <p className="text-sm text-[#87986A] uppercase font-semibold tracking-wider">
              UNPAID RESIDENTS
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9] p-8 w-full max-w-sm cursor-pointer mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center bg-[#97A97C] p-6 rounded-full shadow-md transform hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out">
            <TbCalendarCheck className="text-5xl text-[#E9F5DB]" />
          </div>
          <div className="flex flex-col flex-grow items-start pl-8 space-y-2">
            <h2 className="text-6xl font-bold text-[#718355] tracking-tight">
              {totalBookings}
            </h2>
            <p className="text-sm text-[#87986A] uppercase font-semibold tracking-wider">
              MONTHLY BOOKINGS
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-4">
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
                    <div className="text-sm text-gray-500">
                      BASKETBALL COURT
                    </div>
                    <div className="text-sm text-yellow-600 font-semibold">
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-5/12 bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9] rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="p-4 rounded-xl max-h-[60vh] overflow-y-auto border border-gray-300">
            <div className="bg-[#97A97C] p-4 rounded-md text-white font-semibold text-lg">
              Most Unpaid Residents
            </div>
            <div className="bg-white">
              <div className="flex items-center gap-6 p-4 bg-white hover:bg-gray-200 cursor-pointer rounded-md shadow-md transition-transform duration-300 transform hover:scale-105">
                <div className="flex flex-1 flex-col">
                  <div className="text-lg font-semibold text-gray-900">
                    JOHN REY REBUSQUILLO
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-500">BLOCK 1 LOT 1</div>
                    <div className="text-sm text-red-500 font-semibold">
                      ₱1000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="w-full border-2 border-gray-300 p-3 rounded-xl shadow-lg bg-gradient-to-r from-[#E9F5DB] to-[#CFE1B9]">
          <div className="flex items-center justify-between mb-4 px-4">
            <h2 className="text-xl font-semibold text-[#718355]">
              Recent Applications
            </h2>
            <button className="text-[#718355] font-semibold cursor-pointer hover:underline transition duration-200">
              See All
            </button>
          </div>

          <div className="flex items-center rounded-lg bg-[#97A97C] text-white font-medium mb-2 px-6 py-3">
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
                <div className="flex-1 text-center text-gray-600">
                  10/12/2024
                </div>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
