import React, { useState } from "react";
import MonthlyDuesIncomeDetails from "./Details/MonthlyDuesIncomeDetails";

const Trial = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true); // Show the details when "See details" is clicked
  };

  const handleBackClick = () => {
    setShowDetails(false); // Return to the original view when "Back" is clicked
  };

  return (
    <div>
      {!showDetails ? (
        <div>
          <div
            onClick={handleClick}
            style={{ cursor: "pointer", color: "blue" }}
          >
            See details
          </div>
        </div>
      ) : (
        <div>
          <MonthlyDuesIncomeDetails /> {/* Show the details component */}
          <button
            onClick={handleBackClick}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Trial;
