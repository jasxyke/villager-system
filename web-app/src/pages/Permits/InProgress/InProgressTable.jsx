import React from "react";
import PermitDetails from "../PermitDetails";
import SamplePermits from "../SamplePermits";

const InProgressTable = ({
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
                <div className="flex-1 p-2 text-center">
                  {permit.approveDate}
                </div>
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

export default InProgressTable;
