import React, { useState } from "react";

const ResidentHistoryDetails = () => {
  const [activeTab, setActiveTab] = useState("BILLING");

  const tabs = ["BILLING", "RESERVATION", "PERMITS", "STICKERS", "COMPLAINTS"];

  return (
    <div className="bg-primary rounded-lg max-w-5xl w-full">
      <div className="p-8">
        {/* Tabs Section */}
        <div className="flex space-x-4 mb-6 border-mutedGreen border-2 rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-white font-semibold text-lg transition-all duration-300 ${
                activeTab === tab
                  ? "bg-mutedGreen shadow-lg"
                  : "hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Section */}
        <div className="bg-gray-100 rounded-lg p-6 shadow-lg min-h-[300px]">
          <h2 className="text-xl font-bold text-green-800">
            {activeTab} Content
          </h2>
          <p className="text-green-700 mt-4">
            This is the content area for the {activeTab.toLowerCase()} section.
            {/* You can dynamically load content based on the selected tab here */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResidentHistoryDetails;
