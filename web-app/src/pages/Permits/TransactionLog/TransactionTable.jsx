import React, { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import SamplePermits from "../SamplePermits";

const TransactionTable = ({
  onRowClick,
  detailsView,
  selectedPermit,
  handleBack,
}) => {
  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <TransactionDetails permit={selectedPermit} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Name</div>
              <div className="flex-1 p-2 text-center">Issue Date</div>
              <div className="flex-1 p-2 text-center">Type</div>
              <div className="flex-1 p-2 text-center">Status</div>
            </div>
          </div>
          <div>
            {SamplePermits.map((permit) => (
              <div
                key={permit.id}
                className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                onClick={() => onRowClick(permit)}
              >
                <div className="flex-1 p-2 text-center">{permit.name}</div>
                <div className="flex-1 p-2 text-center">{permit.issueDate}</div>
                <div className="flex-1 p-2 text-center">
                  {permit.permitType}
                </div>
                <div className="flex-1 p-2 text-center">{permit.status}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionTable;
