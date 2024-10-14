import React, { useState } from "react";
import View from "./View";
import useComplaintsByStatus from "../../hooks/useComplaints";

const Pending = () => {
  const [viewing, setViewing] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints with 'Pending' status
  const { complaints, loading, error, solveComplaint, fetchComplaints } =
    useComplaintsByStatus("Pending");

  const handleReviewClick = (complaint) => {
    setSelectedComplaint(complaint);
    setViewing(true);
  };

  const handleBack = () => {
    setViewing(false);
  };

  const handleSolved = async (complaintId) => {
    await solveComplaint(complaintId); // Mark complaint as solved
    setViewing(false);
    fetchComplaints(); // Refresh complaints after solving one
  };

  return (
    <div className="p-10 pt-5">
      {viewing ? (
        <View
          complaint={selectedComplaint}
          onBack={handleBack}
          onSolved={() => handleSolved(selectedComplaint.id)} // Pass complaint ID
        />
      ) : (
        <>
          <div className="grid grid-cols-5 bg-green font-semibold rounded-t-md text-white">
            <div className="px-4 py-3 text-center">NAME</div>
            <div className="px-4 py-3 text-center">ADDRESS</div>
            <div className="px-4 py-3 text-center">TYPE</div>
            <div className="px-4 py-3 text-center">DATE</div>
            <div className="px-4 py-3 text-center">ACTIONS</div>
          </div>

          {loading ? (
            <div className="text-center py-3">Loading complaints...</div>
          ) : error ? (
            <div className="text-center py-3 text-red-500">{error}</div>
          ) : complaints.length > 0 ? (
            complaints.map((item, index) => (
              <div key={index} className="grid grid-cols-5 border-b bg-primary">
                <div className="px-4 py-3 text-center text-white">
                  {item.resident.user.firstname}
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
              No pending complaints found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Pending;
