import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import MonthlyDuesReport from "./MonthlyDuesReport";
import ResidentProfileReport from "./ResidentProfileReport";
import ComplaintsReport from "./ComplaintsReport";
import BookingsReport from "./BookingsReport";
import CarStickersReport from "./CarStickersReport";
import ClearanceRequestsReport from "./ClearanceRequestsReport";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("monthlyDuesReport");

  return (
    <div className="p-5">
      <div>
        <MainLogo />
      </div>
      <div className="bg-green shadow-md rounded-lg overflow-hidden p-2">
        <div className="relative w-full p-1 rounded-sm">
          <div className="flex justify-start">
            {[
              { label: "Overdue Bill Report", value: "monthlyDuesReport" },
              { label: "Resident Profile Report", value: "profileReport" },
              // {
              //   label: "Monthly Financial Report",
              //   value: "monthlyFinancialReport",
              // },
              { label: "Complaints Report", value: "complaintsReport" },
              // { label: "Bookings Report", value: "bookingsReport" },
              // { label: "Car Stickers Report", value: "carStickersReport" },
              // { label: "Clearance Requests Report", value: "clearancesReport" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveTab(value)}
                className={`p-3 text-sm rounded-t-lg border-white transition duration-300 ease-in-out ${
                  activeTab === value
                    ? "bg-oliveGreen text-white"
                    : "text-white"
                }`}
                aria-pressed={activeTab === value}
              >
                {label}
              </button>
            ))}
          </div>
          <div>
            <div className="flex">
              {activeTab === "monthlyDuesReport" && <MonthlyDuesReport />}
              {activeTab === "profileReport" && <ResidentProfileReport />}
              {activeTab === "complaintsReport" && <ComplaintsReport />}
              {activeTab === "bookingsReport" && <BookingsReport />}
              {activeTab === "carStickersReport" && <CarStickersReport />}
              {activeTab === "clearancesReport" && <ClearanceRequestsReport />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
