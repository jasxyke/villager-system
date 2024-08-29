import React, { useState } from "react";
import StickerDetails from "../StickerDetails";
import sampleData from "../SampleData";

const InProgressTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <StickerDetails sticker={selectedSticker} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Name</div>
              <div className="flex-1 p-2 text-center">Block and Lot</div>
              <div className="flex-1 p-2 text-center">Approved Date</div>
              <div className="flex-1 p-2 text-center">Status</div>
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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InProgressTable;
