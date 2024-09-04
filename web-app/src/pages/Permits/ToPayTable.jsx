import React from "react";
import PermitDetails from "./PermitDetails";
import SamplePermits from "./SamplePermits";
const ToPayTable = ({
  onRowClick,
  detailsView,
  selectedPermit,
  handleBack,
}) => {
  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <PermitDetails permit={selectedPermit} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Name</div>
              <div className="flex-1 p-2 text-center">Approved Date</div>
              <div className="flex-1 p-2 text-center">Purpose</div>
              <div className="flex-1 p-2 text-center">Status</div>
              <div className="flex-1 p-2 text-center">Action</div>
            </div>
          </div>
          <div>
            {SamplePermits.map((permit) => (
              <div
                key={permit.id}
                className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                onClick={() => onRowClick(permit)}
              >
                <div className="flex-1 p-2 text-center">Jaspher Xyke</div>
                <div className="flex-1 p-2 text-center">2024-08-31</div>
                <div className="flex-1 p-2 text-center">House Permit</div>
                <div className="flex-1 p-2 text-center">To Pay</div>
                <div className="flex-1 p-2 text-center">
                  <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ToPayTable;
