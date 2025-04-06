import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import RejectionModal from "./RejectionModal";
import ApprovedModal from "./ApprovedModal";
import {
  formatName,
  formatToReadableDate,
  formatUserName,
} from "../../../utils/DataFormatter";
import usePermitReview from "../../../hooks/Permits/usePermitReview";

const PermitApplicationReview = ({ permit, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);
  const { approvePermitRequest, rejectPermitRequest, loading, error, success } =
    usePermitReview(); // Destructure hook values

  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  const handleApproveClick = () => {
    setIsApprovedModalOpen(true);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < permit.permit_documents.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1); // Using functional update to ensure proper state update
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1); // Using functional update to ensure proper state update
    }
  };

  // Check if permit payments should be displayed
  const shouldShowPayments =
    permit.permit_status !== "pending" &&
    permit.permit_status !== "rejected" &&
    permit.permit_status !== "to_pay" &&
    !(!permit.permit_payments || permit.permit_payments.length === 0);

  const handleRejectSubmit = async (reason) => {
    try {
      await rejectPermitRequest(permit.id, reason);
      onBack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRejectModalOpen(false);
    }
  };

  const handleConfirmApproval = async (permitFee, processingFee, note) => {
    try {
      await approvePermitRequest(permit.id, permitFee, processingFee, note);
      onBack();
    } catch (error) {
      // console.log(error);
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
        {permit.permit_status !== "rejected" ? (
          <div className="flex gap-4">
            <button
              className="bg-lime-700 border text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors"
              onClick={handleApproveClick}
              disabled={loading} // Disable if loading
            >
              {loading ? "Processing..." : "Approve"}
            </button>
            <button
              className="bg-red-500 border text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              onClick={handleRejectClick}
              disabled={loading} // Disable if loading
            >
              {loading ? "Processing..." : "Reject"}
            </button>
          </div>
        ) : (
          <div className="mr-5">
            <p className="text-white text-lg">
              Reason for Rejection:{" "}
              <input
                className="app-input"
                type="text"
                disabled
                value={permit.note}
              />
            </p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Display error if any */}
      <form className="space-y-6 p-4">
        <div className="flex flex-wrap gap-6">
          {/* Resident Information */}
          <fieldset className="flex-1 bg-green p-5 rounded-lg shadow-sm border border-gray-300">
            <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
              Resident Information
            </legend>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  label: "Name",
                  value: formatUserName(permit.resident.user, false),
                },
                {
                  label: "Contact Number",
                  value: permit.resident.user.contact_number,
                },
                { label: "Email", value: permit.resident.user.email },
                { label: "Block Number", value: permit.resident.house.block },
                { label: "Lot Number", value: permit.resident.house.lot },
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
        </div>

        {/* Request Details */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
          <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
            Request Details
          </legend>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Clearance Type", value: permit.permit_type },
              { label: "Reason for Request", value: permit.purpose },
              {
                label: "Expected Start Date",
                value: formatToReadableDate(permit.expect_start_date),
              },
              {
                label: "Expected End Date",
                value: formatToReadableDate(permit.expect_end_date),
              },
              // { label: "Floor size", value: permit.floor_size },
              {
                label: "Clearance Status",
                value: formatName(permit.permit_status),
              },
              {
                label: "Requested Date",
                value: formatToReadableDate(permit.application_date) || "N/A",
              },
              {
                label: "Approved Date",
                value: formatToReadableDate(permit.approval_Date) || "N/A",
              },
              {
                label: "Completed Date",
                value: formatToReadableDate(permit.completed_date) || "N/A",
              },
              {
                label: "Claimed Date",
                value: formatToReadableDate(permit.claimed_date) || "N/A",
              },
              { label: "Permit Fee", value: permit.permit_fee || "N/A" },
              {
                label: "Processing Fee",
                value: permit.processing_fee || "N/A",
              },
              { label: "Note/Remarks", value: permit.note || "N/A" },
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

        {/* Permit Payments Fieldset */}
        {shouldShowPayments && (
          <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
            <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
              Clearance Payments
            </legend>
            <div className="grid grid-cols-1 gap-4">
              {permit.permit_payments && permit.permit_payments.length > 0 ? (
                permit.permit_payments.map((payment, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <span className="font-semibold text-white">
                      Payment Amount:
                    </span>
                    <span className="text-white">
                      {payment.amount || "N/A"}
                    </span>
                    <span className="font-semibold text-white">
                      Payment Date:
                    </span>
                    <span className="text-white">
                      {payment.payment_date || "N/A"}
                    </span>
                    <span className="font-semibold text-white">
                      Payment Status:
                    </span>
                    <span className="text-white">
                      {payment.payment_status || "N/A"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-white">No payment records found.</div>
              )}
            </div>
          </fieldset>
        )}

        {/* Supporting Documents */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-300">
          <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
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
                        src={doc.document_url}
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
      {isModalOpen && permit.permit_documents && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 w-full">
          <button
            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-3xl absolute top-4 right-4 z-20 hover:bg-white hover:opacity-40 hover:text-black"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <IoIosClose />
          </button>
          <div className="flex items-center justify-center z-10">
            {currentImageIndex > 0 && (
              <button
                className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 p-2 rounded-full hover:bg-white hover:opacity-40 hover:text-black"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <IoChevronBack />
              </button>
            )}
            <img
              src={permit.permit_documents[currentImageIndex].document_url}
              alt={`Document ${currentImageIndex + 1}`}
              className="max-w-full max-h-screen object-contain transition-transform duration-300 p-5 mx-auto"
            />
            {currentImageIndex < permit.permit_documents.length - 1 && (
              <button
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 p-2 rounded-full hover:bg-white hover:opacity-40 hover:text-black"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <IoChevronForward />
              </button>
            )}
          </div>
        </div>
      )}
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
        permit={permit}
      />
    </div>
  );
};

export default PermitApplicationReview;
