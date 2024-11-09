import React from "react";
import StickerTable from "./StickerTable";

const RequestSticker = () => {
  return (
    <div className="w-full max-w-7xl">
      {/* <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <SearchBar />
      </div> */}
      <div className="mt-2">
        <StickerTable />
      </div>
    </div>
  );
};

export default RequestSticker;
