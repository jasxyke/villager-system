import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import CompletedPermit from "./Completed/CompletedPermit";
import InProgressPermit from "./InProgress/InProgressPermit";
import PermitApplications from "./PermitApplication/PermitApplications";
import ToClaim from "./ToClaim/ToClaim";
import ToPayPermit from "./ToPay/ToPayPermit";
import ExtendedPermits from "./Extensions/ExtendedPermits";

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
              Clearance Requests
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
            {/* <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "extended"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("extended")}
            >
              Extended
            </button> */}
          </div>
        </div>

        <div className="">
          {activeTab === "applications" && <PermitApplications />}
          {activeTab === "toPay" && <ToPayPermit />}
          {activeTab === "inProgress" && <InProgressPermit />}
          {activeTab === "toClaim" && <ToClaim />}
          {activeTab === "completed" && <CompletedPermit />}
          {activeTab === "extended" && <ExtendedPermits />}
        </div>
      </div>
    </div>
  );
};

export default Permits;
