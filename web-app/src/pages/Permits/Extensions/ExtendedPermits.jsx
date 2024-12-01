import React, { useState } from "react";
import Filter from "../Filter";
import SearchBar from "../SearchBar";
import ExtendedPermitsTable from "./ExtendedPermitsTable";

const ExtendedPermits = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="mt-2">
        <div>
          {/* <div className="flex items-center justify-between border-t py-4">
              <Filter />
              <SearchBar />
            </div> */}
          <ExtendedPermitsTable />
        </div>
      </div>
    </div>
  );
};

export default ExtendedPermits;
