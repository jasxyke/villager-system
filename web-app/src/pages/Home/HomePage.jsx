import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import MonthlyIncomeTable from "./MonthlyIncomeTable";
import UnpaidResidentsTable from "./UnpaidResidentsTable";
import AmenitiesSchedule from "./AmenitiesSchedule";
import ClearanceRequest from "./ClearanceRequest";
import StickerRequest from "./StickerRequest";

const HomePage = () => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* Logo Section */}
      <div className="p-4">
        <MainLogo />
      </div>

      {/* Income and Expenses Section */}
      <MonthlyIncomeTable />

      {/* UNPAID RESIDENTS TABLE */}
      <UnpaidResidentsTable />

      <div>
        <div className="flex grid-cols-2">
          <div className="p-4 bg-green mt-5 text-white">
            {/* AMENITIES SCHEDULE */}
            <AmenitiesSchedule />
          </div>
          <div className="p-4 bg-green mt-5 text-white">
            <ClearanceRequest />
            <StickerRequest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
