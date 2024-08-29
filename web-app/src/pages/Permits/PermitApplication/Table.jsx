import React from "react";
import SamplePermits from "../SamplePermits";

const Table = ({ onRowClick, onReviewClick }) => {
  return (
    <div className="overflow-x-auto">
      <div className="w-full">
        <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
          <div className="flex-1 p-2 text-center">Name</div>
          <div className="flex-1 p-2 text-center">Request Date</div>
          <div className="flex-1 p-2 text-center">Type</div>
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
            <div className="flex-1 p-2 text-center">{permit.name}</div>
            <div className="flex-1 p-2 text-center">{permit.requestDate}</div>
            <div className="flex-1 p-2 text-center">{permit.permitType}</div>
            <div className="flex-1 p-2 text-center">{permit.status}</div>
            <div className="flex-1 p-2 text-center">
              <button
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                onClick={(e) => onReviewClick(permit, e)}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
