import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import PermitApplications from "./PermitApplication/PermitApplications";
import PermitTransactionLog from "./TransactionLog/PermitTransactionLog";
import InProgressPermit from "./InProgress/InProgressPermit";
import CompletedPermit from "./Completed/CompletedPermit";
import ToPay from "./ToPay";
import ToClaim from "./ToClaim/ToClaim";
import ToPayPermit from "./ToPay/ToPayPermit";

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
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Permit Applications
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "toPay"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("toPay")}
            >
              To Pay
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "inProgress"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("inProgress")}
            >
              In Progress
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "toClaim"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("toClaim")}
            >
              To Claim
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "completed"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="pt-6">
          {activeTab === "applications" && <PermitApplications />}
          {activeTab === "toPay" && <ToPayPermit />}
          {activeTab === "inProgress" && <InProgressPermit />}
          {activeTab === "toClaim" && <ToClaim />}
          {activeTab === "completed" && <CompletedPermit />}
        </div>
      </div>
    </div>
  );
};

export default Permits;
