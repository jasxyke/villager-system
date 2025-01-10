import React, { useState } from "react";
import View from "./View";
import useComplaintsByStatus from "../../hooks/useComplaints";
import { formatUserName } from "../../../../mobile/utils/DataFormatter";

const Solved = () => {
  const [viewing, setViewing] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints with 'Solved' status
  const { complaints, loading, error } = useComplaintsByStatus("Solved");

  const handleReviewClick = (complaint) => {
    setSelectedComplaint(complaint);
    setViewing(true);
  };

  const handleBack = () => {
    setViewing(false);
  };

  return (
    <div className="p-10 pt-5">
      {viewing ? (
        <View
          complaint={selectedComplaint}
          onBack={handleBack}
          // No need for onSolved here since the complaints are already solved
        />
      ) : (
        <>
          <div className="grid grid-cols-5 bg-green font-semibold rounded-t-md text-white">
            <div className="px-4 py-3 text-center">COMPLAINANT</div>
            <div className="px-4 py-3 text-center">ADDRESS</div>
            <div className="px-4 py-3 text-center">TYPE</div>
            <div className="px-4 py-3 text-center">DATE</div>
            <div className="px-4 py-3 text-center">ACTIONS</div>
          </div>

          {loading ? (
            <div className="text-center py-3 bg-primary text-white">
              Loading complaints...
            </div>
          ) : error ? (
            <div className="text-center py-3 text-red-500">{error}</div>
          ) : complaints.length > 0 ? (
            complaints.map((item, index) => (
              <div key={index} className="grid grid-cols-5 border-b bg-primary">
                <div className="px-4 py-3 text-center text-white">
                  {formatUserName(item.resident.user, false)}
                </div>
                <div className="px-4 py-3 text-center text-white">
                  BLK {item.resident.house.block} LOT {item.resident.house.lot}
                </div>
                <div className="px-4 py-3 text-center text-white">
                  {item.type}
                </div>
                <div className="px-4 py-3 text-center text-white">
                  {new Date(item.date_sent).toLocaleDateString()}
                </div>
                <div className="px-4 py-3 text-center">
                  <button
                    className="text-white px-2 py-1 rounded bg-green hover:bg-secondary"
                    onClick={() => handleReviewClick(item)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-3 bg-primary text-white">
              No solved complaints found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Solved;
