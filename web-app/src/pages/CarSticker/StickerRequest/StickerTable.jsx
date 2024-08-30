import React, { useState } from "react";
import StickerReview from "./StickerReview";
import StickerDetails from "../StickerDetails";
import sampleData from "../SampleData";

const StickerTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleReviewClick = (sticker, e) => {
    e.stopPropagation();
    setSelectedSticker(sticker);
    setDetailsView(false);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <StickerDetails sticker={selectedSticker} onBack={handleBack} />
      ) : selectedSticker ? (
        <StickerReview sticker={selectedSticker} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Name</div>
              <div className="flex-1 p-2 text-center">Block and Lot</div>
              <div className="flex-1 p-2 text-center">Request Date</div>
              <div className="flex-1 p-2 text-center">Status</div>
              <div className="flex-1 p-2 text-center">Action</div>
            </div>
          </div>
          <div>
            {sampleData.map((sticker) => (
              <div
                key={sticker.id}
                className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                onClick={() => handleRowClick(sticker)}
              >
                <div className="flex-1 p-2 text-center">{sticker.id}</div>
                <div className="flex-1 p-2 text-center">{sticker.house}</div>
                <div className="flex-1 p-2 text-center">{sticker.date}</div>
                <div className="flex-1 p-2 text-center">{sticker.status}</div>
                <div className="flex-1 p-2 text-center">
                  <button
                    className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                    onClick={(e) => handleReviewClick(sticker, e)}
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
