import React from "react";
import StickerFilter from "../StickerRequest/StickerFilter";
import SearchBar from "../SearchBar";
import InProgressTable from "./InProgressTable";

const InProgress = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <SearchBar />
      </div>
      <div>
        <InProgressTable />
      </div>
    </div>
  );
};

export default InProgress;
