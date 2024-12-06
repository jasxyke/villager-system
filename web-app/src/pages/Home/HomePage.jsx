import React from "react";
import MainLogo from "../../components/MainLogo";
import MonthlyIncomeTable from "./MonthlyIncomeTable";
import UnpaidResidentsTable from "./UnpaidResidentsTable";
import AmenitiesSchedule from "./AmenitiesSchedule";
import ClearanceRequest from "./ClearanceRequest";
import StickerRequest from "./StickerRequest";
import TrialLang from "./TrialLang";

const HomePage = () => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* Logo Section */}
      <div className="p-4">
        <MainLogo />
      </div>

      <div className="bg-white p-6">
        <div className="mb-5">COMPONENTS</div>

        <div className="flex justify-between gap-5">
          <div className="bg-green p-2 max-w-60 text-white">
            <TrialLang />
          </div>
          <div className="bg-green p-2 max-w-60 text-white">
            helasfagasgasgsags
          </div>
          <div className="bg-green p-2 max-w-60 text-white">
            helasfagasgasgsags
          </div>
          <div className="bg-green p-2 max-w-60 text-white">
            helasfagasgasgsags
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
