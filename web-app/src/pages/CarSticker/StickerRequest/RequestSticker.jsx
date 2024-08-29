import React from "react";
import Filter from "../../Permits/PermitApplication/Filter";
import SearchBar from "../SearchBar";
import StickerTable from "./StickerTable";

const RequestSticker = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between border-t py-4">
        <Filter />
        <SearchBar />
      </div>
      <div className="mt-2">
        <StickerTable />
      </div>
    </div>
  );
};

export default RequestSticker;
