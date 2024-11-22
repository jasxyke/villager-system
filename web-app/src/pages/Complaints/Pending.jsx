import React, { useState } from "react";
import View from "./View";
import useComplaintsByStatus from "../../hooks/useComplaints";

const Pending = () => {
  const [viewing, setViewing] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState("");

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

  const handleSolveClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true); // Open modal
  };

  const handleSolveComplaint = async () => {
    if (selectedComplaint && remarks.trim()) {
      await solveComplaint(selectedComplaint.id, remarks); // Pass complaint ID and remarks
      setShowModal(false);
      setRemarks(""); // Clear remarks
      fetchComplaints(); // Refresh complaints
    }
  };

  return (
    <div className="p-10 pt-5">
      {viewing ? (
        <View
          complaint={selectedComplaint}
          onBack={handleBack}
          onSolved={() => handleSolveClick(selectedComplaint)} // Pass complaint to open modal
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
                  <button
                    className="text-white px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 ml-2"
                    onClick={() => handleSolveClick(item)}
                  >
                    Solve
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

      {/* Modal for solving complaint */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Solve Complaint</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows="4"
              placeholder="Enter remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSolveComplaint}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;
