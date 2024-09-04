import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import RejectionModal from "./RejectionModal";
import ApprovedModal from "./ApprovedModal";

const PermitApplicationReview = ({
  permit,
  onBack,
  rejectPermitRequest,
  approvePermitRequest,
}) => {
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
  const handleRejectSubmit = async (reason) => {
    try {
      await rejectPermitRequest(permit.id, reason);
      alert("The application has been rejected.");
      onBack();
    } catch (error) {
      alert("An error occurred while rejecting the application.");
    } finally {
      setIsRejectModalOpen(false);
    }
  };

  // Handle the confirmation in the approval modal
  const handleConfirmApproval = async (data) => {
    try {
      await approvePermitRequest(permit.id, data);
      alert("The resident has been notified of the approval.");
      onBack();
    } catch (error) {
      console.log(error);
      alert("An error occurred while approving the application.");
    } finally {
      setIsApprovedModalOpen(false);
    }
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
            className="bg-1ime-700 border text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors"
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
            <legend className="text-xl font-semibold text-white  mb-4 ">
              Resident Information
            </legend>
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: "Name", value: permit.resident.user.firstname },
                {
                  label: "Contact Number",
                  value: permit.resident.user.contact_number,
                },

                { label: "Email", value: permit.resident.user.email },
                { label: "Lot Number", value: permit.resident.house.lot },
                { label: "Block Number", value: permit.resident.house.block },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <span className="text-x1 font-semibold text-white">
                    {label}:
                  </span>
                  <span className="text-x1 text-white">{value || "N/A"}</span>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Property Information */}
        </div>

        {/* Request Details */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
          <legend className="text-xl font-semibold text-white  mb-4 ">
            Request Details
          </legend>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Permit Purpose", value: permit.purpose },
              { label: "Status", value: permit.permit_status },
              { label: "Requested Date", value: permit.application_date },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <span className="text-x1 font-semibold text-white">
                  {label}:
                </span>
                <span className="text-x1 text-white">{value || "N/A"}</span>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Supporting Documents */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
          <legend className="text-xl font-semibold text-white  mb-4 ">
            Supporting Documents
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2 text-white font-semibold">
                Documents Submitted:
              </div>
              <div className="flex flex-wrap gap-4">
                {permit.permit_documents &&
                  permit.permit_documents.map((doc, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer w-32 h-32 overflow-hidden border border-gray-400 rounded-md shadow-sm transition-transform transform hover:scale-105"
                      onClick={() => handleImageClick(index)}
                      aria-label={`Document ${index + 1}`}
                    >
                      <img
                        src={doc.url}
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
