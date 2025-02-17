import React, { useState } from "react";
import InProgressTable from "./InProgressTable";
import Filter from "../Filter";
import SearchBar from "../SearchBar";

const InProgressPermit = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="mt-2">
        <div>
          {/* <div className="flex items-center justify-between border-t py-4">
              <Filter />
              <SearchBar />
            </div> */}
          <InProgressTable />
        </div>
      </div>
    </div>
  );
};

export default InProgressPermit;
