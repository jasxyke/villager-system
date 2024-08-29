import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const PermitDetails = ({ permit, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!permit) return null;

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < permit.uploadedDocuments.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="p-6 bg-greenGradient border rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <FiArrowLeft
          className="text-2xl text-white cursor-pointer hover:text-mutedGreen transition"
          onClick={onBack}
          aria-label="Go back"
        />
        <div className="text-2xl font-bold text-white px-5">
          Detailed Information
        </div>
      </div>

      <form className="space-y-6 p-4">
        <div className="flex flex-wrap gap-6">
          {/* Applicant Information */}
          <fieldset className="flex-1 bg-green p-5 rounded-lg shadow-sm border">
            <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
              APPLICANT INFORMATION
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
          <fieldset className="flex-1 bg-green p-5 rounded-lg shadow-sm border">
            <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
              PROPERTY INFORMATION
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
          <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
            Request Details
          </legend>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                label: "Description of Request",
                value: permit.descriptionOfRequest,
              },
              { label: "Reason for Request", value: permit.reasonForRequest },
              { label: "Requested Permit", value: permit.requestedPermit },
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
          <legend className="text-xl font-semibold text-primary font-roboto p-3 border bg-mutedGreen rounded-lg">
            Supporting Documents
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <div className="mb-2 text-white font-semibold">
                Documents Submitted
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

      {/* Image Modal */}
      {isModalOpen && permit.uploadedDocuments && (
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
              src={permit.uploadedDocuments[currentImageIndex]}
              alt={`Document ${currentImageIndex + 1}`}
              className="max-w-full max-h-screen object-contain transition-transform duration-300 p-5 mx-auto"
            />
            {currentImageIndex < permit.uploadedDocuments.length - 1 && (
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
    </div>
  );
};

export default PermitDetails;
