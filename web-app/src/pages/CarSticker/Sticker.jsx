import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import ClaimedStickers from "./Claimed/ClaimedStickers";
import InProgressSticker from "./InProgress/InProgressSticker";
import RequestSticker from "./StickerRequest/RequestSticker";
import ToClaimRequest from "./ToClaim/ToClaimRequest";
import ToPaySticker from "./ToPay/ToPay";

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
                activeTab === "to_pay"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("to_pay")}
            >
              To Pay
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "in_progress"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("in_progress")}
            >
              In Progress
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "to_claim"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("to_claim")}
            >
              To Claim
            </button>
            <button
              className={`relative flex-1 py-2 px-4 text-center cursor-pointer transition-colors duration-300 ${
                activeTab === "claimed"
                  ? "bg-mutedGreen text-black"
                  : "text-white hover:text-mutedGreen"
              }`}
              onClick={() => setActiveTab("claimed")}
            >
              Claimed
            </button>
          </div>
        </div>

        <div className="">
          {activeTab === "request" && <RequestSticker />}
          {activeTab === "to_pay" && <ToPaySticker />}
          {activeTab === "in_progress" && <InProgressSticker />}
          {activeTab === "to_claim" && <ToClaimRequest />}
          {/* Render CompletedRequest component */}
          {activeTab === "claimed" && <ClaimedStickers />}
        </div>
      </div>
    </div>
  );
};

export default Sticker;
