import React from "react";
import StickerFilter from "../StickerRequest/StickerFilter";
import SearchBar from "../SearchBar";
import CompletedTable from "./CompletedTable";

const CompletedRequest = () => {
  return (
    <div className="w-full max-w-7xl">
      {/* <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <SearchBar />
      </div> */}
      <div>
        <CompletedTable />
      </div>
    </div>
  );
};

export default CompletedRequest;
