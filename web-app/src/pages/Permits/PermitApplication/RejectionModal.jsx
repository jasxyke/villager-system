import React, { useState } from "react";
import ReactDOM from "react-dom";

const RejectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reason = selectedReason === "Other" ? otherReason : selectedReason;
    if (!reason) {
      alert("Please provide a reason for rejection.");
      return;
    }
    onSubmit(reason);
    setSelectedReason("");
    setOtherReason("");
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

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Submit
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
