import React, { useState } from "react";
import TransactionFilter from "./TransactionFilter";
import SearchBar from "../SearchBar";
import TransactionTable from "./TransactionTable";
import TransactionDetails from "./TransactionDetails";

const PermitTransactionLog = () => {
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
          <TransactionDetails permit={selectedPermit} onBack={handleBack} />
        ) : (
          <div>
            <div className="flex items-center justify-between border-t py-4">
              <TransactionFilter />
              <SearchBar />
            </div>
            <TransactionTable onRowClick={handleRowClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitTransactionLog;
