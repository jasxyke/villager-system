import React, { useState } from "react";
import Filter from "../Filter";
import SearchBar from "../SearchBar";
import Table from "./Table";
import PermitDetails from "../PermitDetails";
import Review from "./Review";
import SamplePermits from "../SamplePermits";

const PermitApplications = () => {
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleReviewClick = (permit, e) => {
    e.stopPropagation();
    setSelectedPermit(permit);
    setDetailsView(false);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="mt-2">
        {detailsView ? (
          <PermitDetails permit={selectedPermit} onBack={handleBack} />
        ) : selectedPermit ? (
          <Review permit={selectedPermit} onBack={handleBack} />
        ) : (
          <div>
            <div className="flex items-center justify-between border-t py-4">
              <Filter />
              <SearchBar />
            </div>
            <Table
              onRowClick={handleRowClick}
              onReviewClick={handleReviewClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitApplications;
