import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import RejectModal from "./RejectModal"; // Ensure you have this component

const StickerReview = ({ sticker, onBack }) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!sticker) return null;

  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  const handleApproveClick = () => {
    alert("The application has been approved.");
    onBack(); // Call onBack after approval
  };

  const handleRejectSubmit = (reason) => {
    alert(`The application has been rejected. Reason: ${reason}`);
    setIsRejectModalOpen(false);
    onBack(); // Call onBack after rejection
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
          className="text-2xl text-neutral-50 cursor-pointer hover:text-gray-800 transition"
          onClick={onBack}
          aria-label="Go back"
        />
        <div className="flex gap-4 mt-6">
          <button
            className="bg-lime-700 text-white px-4 py-2 rounded hover:bg-lime-600 transition-colors"
            onClick={handleApproveClick}
          >
            Accept
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={handleRejectClick}
          >
            Reject
          </button>
        </div>
      </div>

      <form className="space-y-6">
        {/* Resident Information */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Resident Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Name", value: sticker.residentName },
              { label: "Block", value: sticker.residentBlock },
              { label: "Lot", value: sticker.residentLot },
              { label: "Contact Number", value: sticker.residentPhone },
              { label: "Email", value: sticker.residentEmail },
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
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Vehicle Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Request Information */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Request Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Additional Documentation */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Supporting Documents
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2 text-white font-semibold">Documents</div>
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
            </div>
          </div>
        </fieldset>
      </form>

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
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
