import React from "react";

const pendingSummary = () => {
  return (
    <div>
      <div>
        <div className="bg-green shadow-md rounded-lg overflow-hidden p-2">
          <div className="relative w-full p-1 rounded-sm">
            <div className="flex justify-between">
              {[
                { label: "Monthly Dues Report", value: "monthlyDuesReport" },
                { label: "Official Receipt Report", value: "receiptReport" },
                { label: "Resident Profile Report", value: "profileReport" },
                { label: "Amenity Usage Report", value: "usageReport" },
                { label: "Security Logs Report", value: "logsReport" },
                { label: "Financial Report", value: "financialReport" },
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
                {/* Add other report components here */}
                {/* {activeTab === "receiptReport" && <OfficialReceiptReport />} */}
                {/* {activeTab === "profileReport" && <ResidentProfileReport />} */}
                {/* {activeTab === "usageReport" && <AmenityUsageReport />} */}
                {/* {activeTab === "logsReport" && <SecurityLogsReport />} */}
                {/* {activeTab === "financialReport" && <FinancialReport />} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pendingSummary;
