import React, { useState } from "react";
import Filter from "../Filter";
import SearchBar from "../SearchBar";
import CompletedTable from "./CompletedTable";
import CompletedDetails from "./CompletedDetails";

const CompletedPermit = () => {
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="mt-2">
        {detailsView ? (
          <CompletedDetails permit={selectedPermit} onBack={handleBack} />
        ) : (
          <div>
            <div className="flex items-center justify-between border-t py-4">
              <Filter />
              <SearchBar />
            </div>
            <CompletedTable onRowClick={handleRowClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedPermit;
