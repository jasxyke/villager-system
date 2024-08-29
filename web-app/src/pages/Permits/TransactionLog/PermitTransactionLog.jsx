import React from "react";
import TransactionFilter from "./TransactionFilter";
import SearchBar from "../SearchBar";
import TransactionTable from "./TransactionTable";

const PermitTransactionLog = () => {
  return (
    <div className="w-full max-w-7xl">
      <div className="flex items-center justify-between border-t py-4">
        <TransactionFilter />
        <SearchBar />
      </div>
      <div className="mt-2">
        <TransactionTable />
      </div>
    </div>
  );
};

export default PermitTransactionLog;
