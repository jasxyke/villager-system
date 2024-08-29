import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const PermitApplicationDetails = ({ permit, onBack }) => {
  if (!permit) return null;

  return (
    <div className="p-4 bg-mutedGreen border border-gray-300 rounded-lg shadow-md">
      <div className="flex items-center justify-between p-4">
        <FiArrowLeft className="text-2xl cursor-pointer" onClick={onBack} />
      </div>
      <div className="p-5">
        <div className="space-y-4 border p-5">
          <div>
            <strong>Name:</strong> {permit.name}
          </div>
          <div>
            <strong>Date:</strong> {permit.date}
          </div>
          <div>
            <strong>Status:</strong> {permit.status}
          </div>
          <div>
            <strong>Submission Date:</strong> {permit.submissionDate}
          </div>
          <div>
            <strong>Review Date:</strong> {permit.reviewDate}
          </div>
          <div>
            <strong>Comments:</strong> {permit.comments || "No comments"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermitApplicationDetails;
