import React, { useState } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/usePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const InProgressTable = () => {
  const [detailsView, setDetailsView] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);

  const { permitRequests, loading, error } = usePermitRequests();

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  const handleMarkAsDone = (permit) => {
    const confirm = window.confirm(
      "Are you sure you want to mark this permit as done?"
    );
  };

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <PermitDetails permit={selectedPermit} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full mb-2">
            <div className="flex items-center justify-center font-medium bg-mutedGreen p-2 text-center">
              <div className="flex-1 p-2">Name</div>
              <div className="flex-1 p-2">Approved Date</div>
              <div className="flex-1 p-2">Purpose</div>
              <div className="flex-1 p-2">Status</div>
              <div className="flex-1 p-2">Action</div>
            </div>
          </div>

          <div>
            {loading ? (
              <LoadingContainer />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4 w-full">
                No permits in progress.
              </div>
            ) : (
              permitRequests.map((permit) => (
                <div
                  key={permit.id}
                  className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                  onClick={() => handleRowClick(permit)}
                >
                  <div className="flex-1 p-2 text-center">
                    {permit.resident.user.firstname}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {permit.approval_date}
                  </div>
                  <div className="flex-1 p-2 text-center">{permit.purpose}</div>
                  <div className="flex-1 p-2 text-center">To Claim</div>
                  <div className="flex-1 p-2 text-center">
                    <button
                      className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={() => handleMarkAsDone(permit)}
                    >
                      Mark as Done
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InProgressTable;
