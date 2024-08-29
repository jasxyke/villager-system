import React from "react";
import StickerFilter from "../StickerRequest/StickerFilter";
import SearchBar from "../SearchBar";
import StatusFilter from "../StatusFilter";
import HistoryTable from "./HistoryTable";

const StickerHistory = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <StatusFilter />
        <SearchBar />
      </div>
      <div className="mt-2">
        <HistoryTable />
      </div>
    </div>
  );
};

export default StickerHistory;
