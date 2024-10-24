import React from "react";
import InProgressStickerTable from "./InProgressStickerTable";

const InProgressSticker = () => {
  return (
    <div className="w-full max-w-7xl">
      {/* <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <SearchBar />
      </div> */}
      <div>
        <InProgressStickerTable />
      </div>
    </div>
  );
};

export default InProgressSticker;
