import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import MonthlyDuesReport from "./MonthlyDuesReport";
// Import other report components as needed
// import OfficialReceiptReport from "./OfficialReceiptReport";
// import ResidentProfileReport from "./ResidentProfileReport";
// import AmenityUsageReport from "./AmenityUsageReport";
// import SecurityLogsReport from "./SecurityLogsReport";
// import FinancialReport from "./FinancialReport";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("monthlyDuesReport");

  return (
    <div className="p-5">
      <div>
        <MainLogo />
      </div>
      <div className="bg-green shadow-md rounded-lg overflow-hidden p-2">
        <div className="relative w-full p-1 rounded-sm">
          <div className="flex justify-between">
            {[
              { label: "Monthly Dues Report", value: "monthlyDuesReport" },
              { label: "Resident Profile Report", value: "profileReport" },
              {
                label: "Monthly Financial Report",
                value: "monthlyFinancialReport",
              },
              { label: "Complaints Report", value: "complaintsReport" },
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
              {/* Add other report components here */}
              {/* {activeTab === "profileReport" && <ResidentProfileReport />} */}
              {/* {activeTab === "monthlyFinancialReport" && <MonthlyFinancialReport />} */}
              {/* {activeTab === "complaintsReport" && <ComplaintsReport />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
