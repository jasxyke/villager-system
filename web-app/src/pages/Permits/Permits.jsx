import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import PermitApplications from "./PermitApplication/PermitApplications";
import PermitTransactionLog from "./TransactionLog/PermitTransactionLog";

const Permits = () => {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="p-5">
      <div>
        <MainLogo />
      </div>
      <div className="bg-green p-6 rounded-lg shadow-lg">
        <div className="relative">
          <div className="flex border border-white rounded-md mb-4">
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "applications"
                  ? "bg-mutedGreen text-black"
                  : " text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Permit Applications
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "transactionLog"
                  ? "bg-mutedGreen text-black"
                  : " text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("transactionLog")}
            >
              Permit Transaction Log
            </button>
          </div>
        </div>

        <div className="pt-6">
          {activeTab === "applications" && <PermitApplications />}
          {activeTab === "transactionLog" && <PermitTransactionLog />}
        </div>
      </div>
    </div>
  );
};

export default Permits;
