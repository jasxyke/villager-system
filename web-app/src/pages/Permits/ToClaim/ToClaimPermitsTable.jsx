import React from "react";
import usePermitRequests from "../../../hooks/usePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const ToClaimPermitsTable = () => {
  const { permitRequests, loading, error } = usePermitRequests();

  const handleSetClaimed = (permit) => {
    const confirm = window.confirm(
      "Are you sure you this permit is already claimed?"
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-full mb-2">
        <div className="flex items-center justify-center font-medium bg-mutedGreen p-2 text-center">
          <div className="flex-1 p-2">Name</div>
          <div className="flex-1 p-2">Completed Date</div>
          <div className="flex-1 p-2">Type</div>
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
          <div className="text-center p-4 w-full">No permits to claim.</div>
        ) : (
          permitRequests.map((permit) => (
            <div
              key={permit.id}
              className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
            >
              <div className="flex-1 p-2 text-center">
                {permit.resident.user.firstname}
              </div>
              <div className="flex-1 p-2 text-center">
                {permit.completed_date}
              </div>
              <div className="flex-1 p-2 text-center">{permit.purpose}</div>
              <div className="flex-1 p-2 text-center">{permit.status}</div>
              <div className="flex-1 p-2 text-center">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                  onClick={() => handleSetClaimed(permit)}
                >
                  Set as Claimed
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToClaimPermitsTable;
