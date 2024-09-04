import React from "react";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const Table = ({ onRowClick, onReviewClick, permitRequests, loading }) => {
  return (
    <div className="overflow-x-auto">
      <div className="w-full">
        <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
          <div className="flex-1 p-2 text-center">Name</div>
          <div className="flex-1 p-2 text-center">Request Date</div>
          <div className="flex-1 p-2 text-center">Purpose</div>
          <div className="flex-1 p-2 text-center">Status</div>
          <div className="flex-1 p-2 text-center">Action</div>
        </div>
      </div>
      <div>
        {loading ? (
          <LoadingContainer />
        ) : permitRequests.length > 0 ? (
          permitRequests.map((permit) => (
            <div
              key={permit.id}
              className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
              onClick={() => onRowClick(permit)}
            >
              <div className="flex-1 p-2 text-center">
                {permit.resident.user.firstname}
              </div>
              <div className="flex-1 p-2 text-center">
                {permit.application_date}
              </div>
              <div className="flex-1 p-2 text-center">{permit.purpose}</div>
              <div className="flex-1 p-2 text-center">
                {permit.permit_status}
              </div>
              <div className="flex-1 p-2 text-center">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                  onClick={(e) => onReviewClick(permit, e)}
                >
                  Review
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No permit requests avaialble</p>
        )}
      </div>
    </div>
  );
};

export default Table;
