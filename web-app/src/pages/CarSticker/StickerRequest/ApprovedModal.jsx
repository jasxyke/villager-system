import React, { useState, useEffect } from "react";
import useCarStickerRequests from "../../../hooks/CarStickers/useCarStickerRequests";
import { useSettings } from "../../../contexts/SettingsContext";

const ApprovedModal = ({ isOpen, onClose, onConfirm, carStickerRequestId }) => {
  const [fees, setFees] = useState([
    { label: "Car Sticker Fee", amount: "" },
    { label: "Processing Fee", amount: "" },
  ]);
  const [comment, setComment] = useState("");

  // Use the settings context
  const {
    settings,
    loading: settingsLoading,
    error: settingsError,
  } = useSettings();

  const { updateCarStickerRequest, loading, error, success } =
    useCarStickerRequests(); // Use the custom hook

  // Use effect to set the initial fees from settings when they are loaded
  useEffect(() => {
    if (settings && !settingsLoading) {
      setFees([
        {
          label: "Car Sticker Fee",
          amount: settings.payment_per_car_sticker || "",
        },
        { label: "Processing Fee", amount: settings.processing_fee || "" },
      ]);
    }
  }, [settings, settingsLoading]);

  const handleInputChange = (index, value) => {
    const updatedFees = [...fees];
    updatedFees[index].amount = value;
    setFees(updatedFees);
  };

  const handleConfirm = async () => {
    const allFeesFilled = fees.every((fee) => fee.amount);
    if (!allFeesFilled) {
      alert("Please enter all fees before confirming.");
      return;
    }

    const stickerFee = fees[0].amount; // Car Sticker Fee
    const processingFee = fees[1].amount; // Processing Fee

    try {
      // Call the update function from the hook to submit the form data
      const res = await updateCarStickerRequest(
        carStickerRequestId,
        stickerFee,
        processingFee,
        comment
      );

      if (res) {
        alert(
          "Car sticker request updated and resident notified successfully."
        );
        onConfirm();
        onClose(); // Close the modal after successful update
      }
    } catch (err) {
      alert("An error occurred while updating the request. Please try again.");
    }
  };

  if (!isOpen) return null;

  if (settingsLoading) return <p>Loading settings...</p>;
  if (settingsError) return <p>Error loading settings: {settingsError}</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Approval Confirmation</h2>
        <p className="mb-4">
          Please enter the fees for this Car Sticker Request:
        </p>
        <ul className="mb-4">
          {fees.map((fee, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{fee.label}:</span>
              <input
                type="number"
                min={"1"}
                step={"any"}
                className="border border-gray-300 rounded px-2 py-1 w-64"
                value={fee.amount}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="Enter amount"
              />
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <label htmlFor="comment" className="block font-semibold mb-2">
            Additional Comments:
          </label>
          <textarea
            id="comment"
            className="border border-gray-300 rounded px-2 py-1 w-full h-20 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter any additional comments..."
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-x-4">
          <button
            className={`bg-green text-white px-4 py-2 rounded ${
              loading ? "opacity-50" : "hover:bg-mutedGreen"
            }`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm and Notify Resident"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedModal;
