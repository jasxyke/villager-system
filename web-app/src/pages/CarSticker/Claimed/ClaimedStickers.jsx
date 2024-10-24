import React from "react";
import ClaimedStickersTable from "./ClaimedStickersTable";

const ClaimedStickers = () => {
  return (
    <div className="w-full max-w-7xl">
      {/* <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <StatusFilter />
        <SearchBar />
      </div> */}
      <div className="mt-2">
        <ClaimedStickersTable />
      </div>
    </div>
  );
};

export default ClaimedStickers;
