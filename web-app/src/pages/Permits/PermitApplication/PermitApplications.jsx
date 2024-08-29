import React from "react";
import Filter from "./Filter";
import SearchBar from "../SearchBar";
import Table from "./Table";

const PermitApplications = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between border-t py-4">
        <Filter />
        <SearchBar />
      </div>
      <div className="mt-2">
        <Table />
      </div>
    </div>
  );
};

export default PermitApplications;
