import React, { useState } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/usePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const CompletedTable = () => {
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

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <PermitDetails permit={selectedPermit} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full mb-2">
            <div className="flex items-center justify-center font-medium bg-mutedGreen p-2 text-center">
              <div className="flex-1 p-2">Name</div>
              <div className="flex-1 p-2">Completed Date</div>
              <div className="flex-1 p-2">Type</div>
              <div className="flex-1 p-2">Status</div>
            </div>
          </div>

          <div>
            {loading ? (
              <LoadingContainer />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4 w-full">
                No completed permits found.
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
                    {permit.completed_date}
                  </div>
                  <div className="flex-1 p-2 text-center">{permit.purpose}</div>
                  <div className="flex-1 p-2 text-center">{permit.status}</div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedTable;
