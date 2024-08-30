import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import RequestSticker from "./StickerRequest/RequestSticker";
import StickerHistory from "./StickerHistory/StickerHistory";
import InProgress from "./InProgress/InProgress"; // Import the InProgress component
import CompletedRequest from "./Completed/CompletedRequest"; // Import the CompletedRequest component

const Sticker = () => {
  const [activeTab, setActiveTab] = useState("request");

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
                activeTab === "request"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("request")}
            >
              Car Sticker Request
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "inprogress"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("inprogress")}
            >
              In Progress
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
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "history"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Transaction History
            </button>
          </div>
        </div>

        <div className="pt-6">
          {activeTab === "request" && <RequestSticker />}
          {activeTab === "inprogress" && <InProgress />}
          {activeTab === "completed" && <CompletedRequest />}{" "}
          {/* Render CompletedRequest component */}
          {activeTab === "history" && <StickerHistory />}
        </div>
      </div>
    </div>
  );
};

export default Sticker;
