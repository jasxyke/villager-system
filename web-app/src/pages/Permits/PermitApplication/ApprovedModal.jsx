import React, { useState, useEffect } from "react";
import { useSettings } from "../../../contexts/SettingsContext";
const ApprovedModal = ({ isOpen, onClose, onConfirm, permit }) => {
  const { settings, loading, error } = useSettings(); // Get settings from the context

  const [permitFee, setPermitFee] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [comment, setComment] = useState("");
  // const [squareMeter, setSquareMeter] = useState(permit.floor_size);

  // Calculate fees based on square meter
  // useEffect(() => {
  //   if (!loading && settings) {
  //     const permitFeePerSquareMeter = settings.payment_per_square_meter || 0;

  //     setPermitFee(permitFeePerSquareMeter * squareMeter);
  //     setProcessingFee(settings.processing_fee);
  //   }
  // }, [loading, settings, squareMeter]);

  console.log(permit);

  useEffect(() => {
    if (settings && !loading) {
      setProcessingFee(settings.processing_fee);
      if (permit.permit_type === "Building Clearance") {
        setPermitFee(settings.building_clearance_fee);
      }
      if (permit.permit_type === "Construction Clearance") {
        setPermitFee(settings.construction_clearance_fee);
      }
    }
  }, [settings]);

  const handleInputChange = (index, value) => {
    // Handle input changes if you decide to make the fees editable
  };

  const handleConfirm = () => {
    if (permitFee <= 0 || processingFee <= 0) {
      alert("Please enter a valid fee.");
      return;
    }
    onConfirm(permitFee, processingFee, comment);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Approval Confirmation</h2>
        <p className="mb-4">Please enter the fees for this permit:</p>
        <ul className="mb-4">
          {/* <li className="flex justify-between items-center mb-2">
            <span>Sq. Meter:</span>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-64"
              value={squareMeter}
              onChange={(e) => setSquareMeter(e.target.value)}
              placeholder="Enter square meters"
              required
            />
          </li> */}
          <li className="flex justify-between items-center mb-2">
            <span>Permit Fee:</span>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-64"
              value={permitFee}
              onChange={(e) => setPermitFee(e.target.value)}
              placeholder="Permit Fee"
              // disabled
              required
            />
          </li>
          <li className="flex justify-between items-center mb-2">
            <span>Processing Fee:</span>
            <input
              type="number"
              className="border border-gray-300 rounded px-2 py-1 w-64"
              value={processingFee}
              onChange={(e) => setProcessingFee(e.target.value)}
              placeholder="Processing Fee"
              // disabled
              required
            />
          </li>
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
