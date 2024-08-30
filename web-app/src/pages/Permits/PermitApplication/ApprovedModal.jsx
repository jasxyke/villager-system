import React, { useState } from "react";

const ApprovedModal = ({ isOpen, onClose, onConfirm }) => {
  const [fees, setFees] = useState([
    { label: "Permit Fee", amount: "" },
    { label: "Processing Fee", amount: "" },
  ]);
  const [comment, setComment] = useState("");

  const handleInputChange = (index, value) => {
    const updatedFees = [...fees];
    updatedFees[index].amount = value;
    setFees(updatedFees);
  };

  const handleConfirm = () => {
    const allFeesFilled = fees.every((fee) => fee.amount);
    if (!allFeesFilled) {
      alert("Please enter all fees before confirming.");
      return;
    }
    onConfirm({ fees, comment }); // Pass the fees and comment to the onConfirm function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Approval Confirmation</h2>
        <p className="mb-4">Please enter the fees for this permit:</p>
        <ul className="mb-4">
          {fees.map((fee, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{fee.label}:</span>
              <input
                type="number"
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

        <div className="space-x-4">
          <button
            className="bg-green text-white px-4 py-2 rounded hover:bg-mutedGreen"
            onClick={handleConfirm}
          >
            Confirm and Notify Resident
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
