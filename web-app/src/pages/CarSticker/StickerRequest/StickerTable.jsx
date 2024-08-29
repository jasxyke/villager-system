import React, { useState } from "react";
import StickerReview from "./StickerReview";
import StickerDetails from "./StickerDetails";

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    date: "2024-08-20",
    status: "Pending",
    submissionDate: "2024-08-15",
    reviewDate: "2024-08-21",
    comments: "All good",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2024-08-22",
    status: "Pending",
    submissionDate: "2024-08-17",
    reviewDate: "2024-08-24",
    comments: "",
  },
  {
    id: 3,
    name: "Emily Johnson",
    date: "2024-08-23",
    status: "Pending",
    submissionDate: "2024-08-18",
    reviewDate: "2024-08-25",
    comments: "Incomplete information",
  },
];

const StickerTable = () => {
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleReviewClick = (permit, e) => {
    e.stopPropagation();
    setSelectedPermit(permit);
    setDetailsView(false);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <StickerDetails permit={selectedPermit} onBack={handleBack} />
      ) : selectedPermit ? (
        <StickerReview permit={selectedPermit} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Applicant</div>
              <div className="flex-1 p-2 text-center">Received</div>
              <div className="flex-1 p-2 text-center">Status</div>
              <div className="flex-1 p-2 text-center">Actions</div>
            </div>
          </div>
          <div>
            {sampleData.map((permit) => (
              <div
                key={permit.id}
                className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                onClick={() => handleRowClick(permit)}
              >
                <div className="flex-1 p-2 text-center">{permit.name}</div>
                <div className="flex-1 p-2 text-center">{permit.date}</div>
                <div className="flex-1 p-2 text-center">{permit.status}</div>
                <div className="flex-1 p-2 text-center">
                  <button
                    className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                    onClick={(e) => handleReviewClick(permit, e)}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StickerTable;
