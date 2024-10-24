import React, { useState } from "react";
import ReactDOM from "react-dom";
import useCarStickerRequests from "../../../hooks/CarStickers/useCarStickerRequests";

const RejectionModal = ({ isOpen, onClose, requestId, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const { rejectCarStickerRequest, loading, error, success } =
    useCarStickerRequests(); // Destructure the hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reason = selectedReason === "Other" ? otherReason : selectedReason;

    try {
      // Call the rejectCarStickerRequest function with the requestId and reason
      let res = await rejectCarStickerRequest(requestId, reason);

      if (res) {
        // Handle successful rejection (e.g., show notification, close modal, etc.)
        onSubmit(reason);
        setSelectedReason("");
        setOtherReason("");
        onSubmit();
        onClose(); // Close the modal after successful rejection
      }
    } catch (err) {
      console.error("Failed to reject the request:", error);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold">Reason for Rejection</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a reason</option>
            <option value="Incomplete Application">
              Incomplete Application
            </option>
            <option value="Non-Compliance with Regulations">
              Non-Compliance with Regulations
            </option>
            <option value="Insufficient Justification">
              Insufficient Justification
            </option>
            <option value="Environmental Concerns">
              Environmental Concerns
            </option>
            <option value="Financial or Legal Issues">
              Financial or Legal Issues
            </option>
            <option value="Other">Other</option>
          </select>

          {selectedReason === "Other" && (
            <textarea
              rows="4"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              placeholder="Enter the reason for rejection"
              required
            />
          )}

          {loading && <p>Submitting rejection...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RejectionModal;
