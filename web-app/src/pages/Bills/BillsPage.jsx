import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import BillList from "./BillList";
import TransactionHistory from "./TransactionHistory";
import Reminders from "./Reminders";
import Filters from "./Filters";
import OverdueBills from "./OverdueBills";
import ResidentAccounts from "./ResidentAccounts/ResidentAccounts";

const BillsPage = () => {
  const [activeFilter, setActiveFilter] = useState("overdue");
  const [searchPressed, setSearchPressed] = useState(false);
  const [filters, setFilters] = useState({
    status: "pending",
    month: null,
    year: null,
    searchQuery: "",
  });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchPress = () => {
    setSearchPressed(true);
  };

  return (
    <div className="p-6 min-h-screen">
      <MainLogo />
      <div className="bg-gradient-to-t from-green to-mutedGreen shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          {[
            "overdue",
            "residentAccounts",
            "billList",
            "transactionHistory",
            "reminders",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`flex-1 text-center py-3 transition-all duration-300 ease-in-out ${
                activeFilter === filter
                  ? "bg-paleDarkGreen text-white"
                  : "bg-green  text-white hover:bg-paleDarkGreen"
              } `}
            >
              {filter === "overdue" && "Overdues"}
              {filter === "residentAccounts" && "Resident Accounts"}
              {filter === "billList" && "Monthly Dues List"}
              {filter === "transactionHistory" && "Transaction History"}
              {filter === "reminders" && "Reminders"}
            </button>
          ))}
        </div>

        {/* Do not show Filters for "Overdue Bills" and "Reminders" */}
        {activeFilter !== "overdue" &&
          activeFilter !== "reminders" &&
          activeFilter !== "residentAccounts" && (
            <div className="p-4">
              <Filters
                onFiltersChange={handleFiltersChange}
                handleSearchPress={handleSearchPress}
                filter={activeFilter}
              />
            </div>
          )}

        <div className="p-5">
          {/* OVERDUE BILLS */}
          {activeFilter === "overdue" && <OverdueBills />}
          {activeFilter === "residentAccounts" && <ResidentAccounts />}

          {/* Bill List */}
          {activeFilter === "billList" && (
            <BillList
              status={filters.status}
              month={filters.month}
              year={filters.year}
              searchQuery={filters.searchQuery}
              searchPressed={searchPressed}
              setSearchPressed={setSearchPressed}
            />
          )}

          {/* Transaction History */}
          {activeFilter === "transactionHistory" && (
            <TransactionHistory
              month={filters.month}
              year={filters.year}
              searchQuery={filters.searchQuery}
              searchPressed={searchPressed}
              setSearchPressed={setSearchPressed}
            />
          )}

          {/* Reminders */}
          {activeFilter === "reminders" && <Reminders />}
        </div>
      </div>
    </div>
  );
};

export default BillsPage;
