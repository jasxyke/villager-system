import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import BillList from "./BillList";
import TransactionHistory from "./TransactionHistory";
import Reminders from "./Reminders";
import Filters from "./Filters";

const BillsPage = () => {
  const [activeFilter, setActiveFilter] = useState("billList");
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
      <div className="bg-green shadow-md rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-300">
          {["billList", "transactionHistory", "reminders"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`flex-1 text-center py-3 border-b-2 ${
                activeFilter === filter
                  ? "bg-secondary border-olive text-black"
                  : "bg-green border-transparent text-white hover:bg-paleDarkGreen"
              }`}
            >
              {filter === "billList" && "Bill List"}
              {filter === "transactionHistory" && "Transaction History"}
              {filter === "reminders" && "Reminders"}
            </button>
          ))}
        </div>
        {activeFilter !== "reminders" ? (
          <div className="p-4">
            <Filters
              onFiltersChange={handleFiltersChange}
              handleSearchPress={handleSearchPress}
              filter={activeFilter}
            />
          </div>
        ) : null}

        <hr className="border-white" />

        <div className="p-5">
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
          {activeFilter === "transactionHistory" && (
            <TransactionHistory
              month={filters.month}
              year={filters.year}
              searchQuery={filters.searchQuery}
              searchPressed={searchPressed}
              setSearchPressed={setSearchPressed}
            />
          )}
          {activeFilter === "reminders" && <Reminders />}
        </div>
      </div>
    </div>
  );
};

export default BillsPage;
