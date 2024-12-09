import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { formatName, formatUserName } from "../../utils/DataFormatter";

const StickerDetails = ({ sticker, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!sticker) return null;

  console.log(sticker);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
        <div className="text-2xl font-bold text-white">
          Detailed Information
        </div>
      </div>

      <form className="space-y-6">
        {/* Applicant Information */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Resident Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Name",
                value: formatUserName(sticker.resident.user, false),
              },
              { label: "Block", value: sticker.resident.house.block },
              { label: "Lot", value: sticker.resident.house.lot },
              {
                label: "Contact Number",
                value: sticker.resident.user.contact_number,
              },
              { label: "Email", value: sticker.resident.user.email },
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
              { label: "Model", value: sticker.car_model },
              {
                label: "License Plate Number",
                value: sticker.car_plate_number,
              },
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

        {/* Request Details */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Request Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Request Date", value: sticker.application_date },
              { label: "Status", value: formatName(sticker.request_status) },
              { label: "Approved Date", value: sticker.approval_date },
              { label: "Completed Date", value: sticker.completed_date },
              { label: "Claimed Date", value: sticker.claimed_date },
              { label: "Additional Note", value: sticker.note },
              { label: "Sticker Fee", value: sticker.sticker_fee },
              // { label: "Processing Fee", value: sticker.processing_fee },
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
        {/* Payment Details */}
        {sticker.request_status !== "pending" &&
        sticker.request_status !== "approved" &&
        sticker.request_status !== "rejected" &&
        sticker.sticker_payments.length !== 0 ? (
          <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
            <legend className="text-xl font-semibold text-white mb-4">
              Payment Details
            </legend>
            {sticker.sticker_payments.map((payment) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Payment Date", value: payment.payment_date },
                  {
                    label: "Payment Status",
                    value: formatName(payment.payment_status),
                  },
                  { label: "Paid Amount", value: payment.amount },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center">
                    <label className="w-1/3 font-semibold text-white">
                      {label}:
                    </label>
                    <div className="w-2/3 text-white">{value || "N/A"}</div>
                  </div>
                ))}
              </div>
            ))}
          </fieldset>
        ) : null}

        {/* Additional Information */}
        <fieldset className="bg-green p-5 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-white mb-4">
            Additional Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2 text-white font-semibold">Documents</div>
              <div className="flex flex-wrap gap-4">
                {sticker.sticker_documents &&
                  sticker.sticker_documents.map((document, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer w-32 h-32 overflow-hidden border border-gray-300 rounded-md shadow-sm transition-transform transform hover:scale-105"
                      onClick={() => handleImageClick(index)}
                      aria-label={`Document ${index + 1}`}
                    >
                      <img
                        src={document.document_url}
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

      {/* Modal for enlarged image */}
      {isModalOpen && sticker.sticker_documents && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 w-full">
          <button
            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-3xl absolute top-4 right-4 z-20 hover:bg-white hover:text-black"
            onClick={handleCloseModal}
            aria-label="Close modal"
          >
            <IoIosClose />
          </button>

          <div className="flex items-center justify-center z-10">
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
              src={sticker.sticker_documents[currentImageIndex].document_url}
              alt={`Document ${currentImageIndex + 1}`}
              className="max-w-full max-h-screen object-contain transition-transform duration-300 p-5 mx-auto"
            />
            {currentImageIndex < sticker.sticker_documents.length - 1 && (
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

export default StickerDetails;
