import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import RejectionModal from "./RejectionModal";
import ApprovedModal from "./ApprovedModal";

const PermitApplicationReview = ({ permit, onBack }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);

  // Handle the reject button click
  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  // Handle the approval button click
  const handleApproveClick = () => {
    setIsApprovedModalOpen(true);
  };

  // Handle submission of the rejection form
  const handleRejectSubmit = (reason) => {
    alert(`The application has been rejected. Reason: ${reason}`);
    setIsRejectModalOpen(false);
    onBack(); // Call onBack after rejection
  };

  // Handle the confirmation in the approval modal
  const handleConfirmApproval = () => {
    alert("The resident has been notified of the approval.");
    setIsApprovedModalOpen(false);
    onBack(); // Call onBack after approval
  };

  return (
    <div className="p-6 bg-greenGradient border border-gray-300 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <FiArrowLeft
          color="white"
          className="text-2xl cursor-pointer"
          onClick={onBack}
        />
        <div>PERMIT REQUEST DETAILS</div>
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

      <form className="space-y-6 p-4">
        <div className="flex flex-wrap gap-6">
          {/* Applicant Information */}
          <fieldset className="flex-1 bg-green p-5 rounded-lg shadow-sm border border-gray-300">
            <legend className="text-4xl font-semibold font-roboto text-stroke mb-4 px-4 bg-mutedGreen border">
              Resident Information
            </legend>
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: "Name", value: permit.name },
                { label: "Contact Number", value: permit.phoneNumber },

                { label: "Email", value: permit.emailAddress },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <span className="font-semibold text-white">{label}:</span>
                  <span className="text-white">{value || "N/A"}</span>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Property Information */}
          <fieldset className="flex-1 bg-green p-5 rounded-lg shadow-sm border border-gray-300">
            <legend className="text-4xl font-semibold font-roboto text-stroke mb-4 px-4 bg-mutedGreen border">
              Property Information
            </legend>
            <div className="flex flex-col gap-4">
              {[
                { label: "Property Address", value: permit.propertyAddress },
                { label: "Lot Number", value: permit.lotNumber },
                { label: "Block Number", value: permit.blockNumber },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center space-x-4">
                  <span className="font-semibold text-white w-1/3">
                    {label}:
                  </span>
                  <span className="text-white">{value || "N/A"}</span>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Request Details */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
          <legend className="text-4xl font-semibold font-roboto text-stroke mb-4 px-4 bg-mutedGreen border">
            Requested Details
          </legend>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: "Description of Request",
                value: permit.descriptionOfRequest,
              },
              { label: "Reason for Request", value: permit.reasonForRequest },
              { label: "Requested Permit", value: permit.requestedPermit },
              { label: "Permit Purpose", value: permit.phoneNumber },
              { label: "Status", value: permit.phoneNumber },
              { label: "Requested Date", value: permit.phoneNumber },
              { label: "Expected Starting Date", value: permit.startDate },
              { label: "Expected Completion Date", value: permit.endDate },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <span className="font-semibold text-white">{label}:</span>
                <span className="text-white">{value || "N/A"}</span>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Supporting Documents */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
          <legend className="text-4xl font-semibold font-roboto text-stroke mb-4 px-4 bg-mutedGreen border">
            Documents
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2 text-white font-semibold">
                Documents Submitted:
              </div>
              <div className="flex flex-wrap gap-4">
                {permit.uploadedDocuments &&
                  permit.uploadedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer w-32 h-32 overflow-hidden border border-gray-400 rounded-md shadow-sm transition-transform transform hover:scale-105"
                      onClick={() => handleImageClick(index)}
                      aria-label={`Document ${index + 1}`}
                    >
                      <img
                        src={doc}
                        alt={`Document ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </fieldset>
      </form>

      {/* Modal Components */}
      <RejectionModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />
      <ApprovedModal
        isOpen={isApprovedModalOpen}
        onClose={() => setIsApprovedModalOpen(false)}
        onConfirm={handleConfirmApproval}
        fees={[
          { label: "Permit Fee", amount: "$50.00" },
          { label: "Processing Fee", amount: "$10.00" },
        ]}
      />
    </div>
  );
};

export default PermitApplicationReview;
