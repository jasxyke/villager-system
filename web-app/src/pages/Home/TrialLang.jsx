import React, { useState } from "react";
import DetailsTry from "./DetailsTry"; // Assuming DetailsTry is imported

const TrialLang = () => {
  const [showDetails, setShowDetails] = useState(false); // State to control visibility

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggle the state
  };

  return (
    <div className="p-4 bg-gray-200 relative">
      <div className="text-sm font-semibold text-white">Monthly Dues</div>
      <hr />
      <div>
        <button className="bg-white p-2 text-black" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "See Details"}
        </button>
      </div>

      {/* Conditionally render DetailsTry component as a full-page overlay */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
          <DetailsTry onClose={toggleDetails} />
        </div>
      )}
    </div>
  );
};

export default TrialLang;
