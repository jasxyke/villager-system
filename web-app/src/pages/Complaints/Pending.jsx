import React, { useState } from "react";
import View from "./View";

const Pending = () => {
  const [viewing, setViewing] = useState(false);

  const handleReviewClick = (e) => {
    e.stopPropagation();
    setViewing(true);
  };

  const handleBack = () => {
    setViewing(false);
  };

  const sample = [
    {
      name: "John Rey",
      address: "Block 1 Lot 2",
      type: "Noise",
      date: "July 24, 2024",
    },
  ];

  return (
    <div className="p-10 pt-5">
      {viewing ? (
        <View onBack={handleBack} />
      ) : (
        <>
          <div className="grid grid-cols-5 bg-green font-semibold rounded-t-md text-white">
            <div className="px-4 py-3 text-center">NAME</div>
            <div className="px-4 py-3 text-center">ADDRESS</div>
            <div className="px-4 py-3 text-center">TYPE</div>
            <div className="px-4 py-3 text-center">DATE</div>
            <div className="px-4 py-3 text-center">ACTIONS</div>
          </div>
          {sample.map((item, index) => (
            <div key={index} className="grid grid-cols-5 border-b">
              <div className="px-4 py-3 text-center">{item.name}</div>
              <div className="px-4 py-3 text-center">{item.address}</div>
              <div className="px-4 py-3 text-center">{item.type}</div>
              <div className="px-4 py-3 text-center">{item.date}</div>
              <div className="px-4 py-3 text-center">
                <button
                  className="text-white px-2 py-1 rounded bg-green hover:bg-secondary"
                  onClick={handleReviewClick}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Pending;
