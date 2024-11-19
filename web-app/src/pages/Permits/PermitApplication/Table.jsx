import React from "react";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import { formatName, formatUserName } from "../../../utils/DataFormatter";

const Table = ({ onRowClick, onReviewClick, permitRequests, loading }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full rounded-t shadow-lg">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 p-2 bg-oliveGreen text-white font-semibold rounded-t">
          <div className="flex items-center justify-center">Name</div>
          <div className="flex items-center justify-center">Request Date</div>
          <div className="flex items-center justify-center">Purpose</div>
          <div className="flex items-center justify-center">Status</div>
          <div className="flex items-center justify-center">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-300 h-[350px] overflow-y-auto">
          {loading ? (
            <LoadingContainer color="green" bgColor="white" />
          ) : permitRequests.length > 0 ? (
            permitRequests.map((permit, index) => (
              <div
                key={permit.id}
                className={`grid grid-cols-5 gap-4 p-4 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
                onClick={() => onRowClick(permit)}
              >
                {/* Name */}
                <div className="flex items-center justify-center text-center">
                  {formatUserName(permit.resident.user, false)}
                </div>
                {/* Request Date */}
                <div className="flex items-center justify-center text-center">
                  {permit.application_date}
                </div>
                {/* Purpose */}
                <div className="flex items-center justify-center text-center">
                  {permit.purpose}
                </div>
                {/* Status */}
                <div className="flex items-center justify-center text-center">
                  {formatName(permit.permit_status)}
                </div>
                {/* Action Button */}
                <div className="flex items-center justify-center text-center">
                  <button
                    className="text-white bg-oliveGreen rounded-xl w-28 p-2 hover:underline transition-colors"
                    onClick={(e) => onReviewClick(permit, e)}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 bg-white">No permit requests available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
