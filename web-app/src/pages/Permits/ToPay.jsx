import React, { useState } from "react";
import InProgressTable from "./InProgress/InProgressTable";
import InProgressDetails from "./InProgress/InProgressDetails";
import ToPayTable from "./ToPayTable";

const ToPay = () => {
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
          <InProgressDetails permit={selectedPermit} onBack={handleBack} />
        ) : (
          <div>
            {/* <div className="flex items-center justify-between border-t py-4">
              <Filter />
              <SearchBar />
            </div> */}
            <ToPayTable onRowClick={handleRowClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ToPay;
