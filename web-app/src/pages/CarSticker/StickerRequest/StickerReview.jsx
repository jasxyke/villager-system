import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import RejectModal from "./RejectModal";

const PermitApplicationReview = ({ permit, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle the reject button click
  const handleRejectClick = () => {
    setIsModalOpen(true);
  };

  // Handle the approval button click
  const handleApproveClick = () => {
    alert("The application has been approved.");
    onBack(); // Call onBack after approval
  };

  // Handle submission of the rejection form
  const handleRejectSubmit = (reason) => {
    alert(`The application has been rejected. Reason: ${reason}`);
    setIsModalOpen(false);
    onBack(); // Call onBack after rejection
  };

  return (
    <div className="p-6 bg-greenGradient border border-gray-300 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <FiArrowLeft
          color="white"
          className="text-2xl cursor-pointer"
          onClick={onBack}
        />
        <div className="flex gap-4">
          <button
            className="bg-green border text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            onClick={handleApproveClick} // Handle approval
          >
            Approve
          </button>
          <button
            className="bg-red-500 border text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={handleRejectClick} // Handle rejection
          >
            Reject
          </button>
        </div>
      </div>

      <div className="border-t p-6">
        <div className="text-lg font-semibold">Application Details</div>
        <div className="mt-2">
          <div className="mb-2">
            <strong>Permit ID:</strong> {permit.id}
          </div>
          <div className="mb-2">
            <strong>Applicant Name:</strong> {permit.name}
          </div>
          <div className="mb-2">
            <strong>Date:</strong> {permit.date}
          </div>
          <div className="mb-2">
            <strong>Status:</strong> {permit.status}
          </div>
        </div>
      </div>
      <div className="mt-4 p-6">
        <div className="mt-2">
          <div className="mb-2">
            <strong>Submission Date:</strong> {permit.submissionDate}
          </div>
          <div className="mb-2">
            <strong>Review Date:</strong> {permit.reviewDate}
          </div>
          <div>
            <strong>Comments:</strong>{" "}
            {permit.comments || "No comments available"}
          </div>
        </div>
      </div>

      <RejectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
};

export default PermitApplicationReview;
