import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const TransactionDetails = ({ permit, onBack }) => {
  if (!permit) return null;

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-greenGradient">
        <FiArrowLeft
          color="white"
          className="text-2xl cursor-pointer"
          onClick={onBack}
        />
      </div>
    </div>
  );
};

export default TransactionDetails;
