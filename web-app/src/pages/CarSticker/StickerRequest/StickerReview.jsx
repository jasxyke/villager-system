import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import RejectModal from "./RejectModal"; // Ensure you have this component
import ApprovedModal from "./ApprovedModal"; // Import ApprovedModal

const StickerReview = ({ sticker, onBack }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false); // Manage ApprovedModal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!sticker) return null;

  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  const handleApproveClick = () => {
    setIsApprovedModalOpen(true); // Open ApprovedModal
  };

  const handleRejectSubmit = (reason) => {
    alert(`The application has been rejected. Reason: ${reason}`);
    setIsRejectModalOpen(false);
    onBack(); // Call onBack after rejection
  };

  const handleApprovedSubmit = ({ fees, comment }) => {
    alert(
      `The resident has been notified of the approval.
      Comment: ${comment}`
    );
    setIsApprovedModalOpen(false);
    onBack(); // Call onBack after approval
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < sticker.uploadedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="p-6 bg-greenGradient border border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <FiArrowLeft
          className="text-3xl text-white cursor-pointer hover:text-mutedGreen transition"
          onClick={onBack}
          aria-label="Go back"
        />
        <div className="flex gap-4 mt-6 px-8">
          <button
            className="bg-green text-white px-4 py-2 rounded hover:bg-mutedGreen transition-colors border"
            onClick={handleApproveClick}
          >
            Approve
          </button>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors border"
            onClick={handleRejectClick}
          >
            Reject
          </button>
        </div>
      </div>

      <form className="space-y-6 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Request Details */}
          <fieldset className="flex-1 p-5 rounded-lg shadow-sm border bg-green bg-opacity-80">
            <legend className="text-xl font-semibold text-white bg-green p-2 font-roboto border">
              Request Details
            </legend>
            <div className="space-y-4">
              {[
                { label: "Request Date", value: sticker.requestDate },
                { label: "Status", value: sticker.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <label className="w-1/3 font-semibold text-white">
                    {label}:
                  </label>
                  <div className="w-2/3 text-white">{value || "N/A"}</div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Vehicle Information */}
          <fieldset className="flex-1 p-5 rounded-lg shadow-sm border bg-green bg-opacity-80">
            <legend className="text-xl font-semibold text-white bg-green p-2 font-roboto border">
              Vehicle Information
            </legend>
            <div className="space-y-4">
              {[
                { label: "Model", value: sticker.vehicleModel },
                { label: "License Plate Number", value: sticker.licensePlate },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <label className="w-1/3 font-semibold text-white">
                    {label}:
                  </label>
                  <div className="w-2/3 text-white">{value || "N/A"}</div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Resident Information */}
          <fieldset className="flex-1 bg-green bg-opacity-80 p-5 rounded-lg shadow-sm border">
            <legend className="text-xl font-semibold text-white bg-green p-2 font-roboto border">
              Resident Information
            </legend>
            <div className="space-y-4">
              {[
                { label: "Name", value: sticker.name },
                { label: "Block", value: sticker.block },
                { label: "Lot", value: sticker.lot },
                { label: "Phone Number", value: sticker.phone },
                { label: "Email Address", value: sticker.email },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <label className="w-1/3 font-semibold text-white">
                    {label}:
                  </label>
                  <div className="w-2/3 text-white">{value || "N/A"}</div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Payment Information */}
          <fieldset className="flex-1 bg-green bg-opacity-80 p-5 rounded-lg shadow-sm border border-gray-200">
            <legend className="text-xl font-semibold text-white bg-green p-2 font-roboto border">
              Payment Information
            </legend>
            <div className="space-y-4">
              {[
                { label: "Sticker Fee", value: sticker.stickerFee },
                { label: "Payment Status", value: sticker.paymentStatus },
                { label: "Payment Method", value: sticker.paymentMethod },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center">
                  <label className="w-1/3 font-semibold text-white">
                    {label}:
                  </label>
                  <div className="w-2/3 text-white">{value || "N/A"}</div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Documents */}
        <fieldset className="p-5 rounded-lg shadow-sm border bg-green bg-opacity-80">
          <legend className="text-xl font-semibold text-white bg-green p-2 font-roboto border">
            Documents
          </legend>
          <div className="flex flex-wrap gap-4">
            {sticker.uploadedImages &&
              sticker.uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer w-32 h-32 overflow-hidden border border-gray-300 rounded-md shadow-sm transition-transform transform hover:scale-105"
                  onClick={() => handleImageClick(index)}
                  aria-label={`Document ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Document ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </fieldset>
      </form>

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />

      {/* Approved Modal */}
      <ApprovedModal
        isOpen={isApprovedModalOpen}
        onClose={() => setIsApprovedModalOpen(false)}
        onConfirm={handleApprovedSubmit}
      />

      {/* Image Modal */}
      {isImageModalOpen && sticker.uploadedImages && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <button
            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-3xl absolute top-4 right-4 z-20 hover:bg-white hover:text-black"
            onClick={handleCloseImageModal}
            aria-label="Close modal"
          >
            <IoIosClose />
          </button>

          <div className="flex items-center justify-center">
            {currentImageIndex > 0 && (
              <button
                className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 p-2 rounded-full hover:bg-white hover:text-black"
                onClick={handlePrevImage}
                aria-label="Previous image"
              >
                <IoChevronBack />
              </button>
            )}
            <img
              src={sticker.uploadedImages[currentImageIndex]}
              alt={`Document ${currentImageIndex + 1}`}
              className="max-w-full max-h-screen object-contain transition-transform duration-300 p-5 mx-auto"
            />
            {currentImageIndex < sticker.uploadedImages.length - 1 && (
              <button
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 p-2 rounded-full hover:bg-white hover:text-black"
                onClick={handleNextImage}
                aria-label="Next image"
              >
                <IoChevronForward />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickerReview;
