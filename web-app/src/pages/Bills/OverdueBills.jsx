import React, { useState, useEffect } from "react";
import OverdueViewDetails from "./OverdueViewDetails";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import {
  formatToReadableDate,
  formatUserName,
} from "../../utils/DataFormatter";
import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import useDebounce from "../../hooks/useDebounce"; // New hook for debouncing
import useResidentsWithOverdues from "../../hooks/Bills/useResidentsWithOverdues";

const OverdueBills = () => {
  const [selectedResident, setSelectedResident] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    residents,
    loading,
    error,
    currentPage,
    lastPage,
    search,
    fetchResidents,
    changePage,
    setSearch,
  } = useResidentsWithOverdues();

  const [selectedResidents, setSelectedResidents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Debounced search term (waits for 500ms after typing stops)
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearch) {
      setSearch(debouncedSearch); // Update search with debounced value
    } else {
      setSearch("");
    }
  }, [debouncedSearch]);

  // Search handler
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handling page change
  const handlePageClick = (event) => {
    changePage(event.selected + 1);
  };

  // Handling selection of individual residents
  const handleCheckboxChange = (residentId) => {
    setSelectedResidents((prevSelected) =>
      prevSelected.includes(residentId)
        ? prevSelected.filter((id) => id !== residentId)
        : [...prevSelected, residentId]
    );
  };

  // Handling select/deselect all residents
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Handling clear search
  const handleClear = () => {
    setSearch("");
    setSearchQuery("");
  };

  //refetch when sucess
  const handleSucess = () => {
    fetchResidents();
  };

  // View detailed resident info
  const handleViewClick = (resident) => setSelectedResident(resident);
  const handleBack = () => setSelectedResident(null);

  if (selectedResident) {
    return (
      <OverdueViewDetails
        resident={selectedResident}
        onBack={handleBack}
        onSucess={handleSucess}
      />
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-2">
      {/* Search Bar */}
      <div className="flex items-end mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 border rounded pr-10 bg-white text-black"
          />
          {searchQuery === "" ? (
            <CiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
          ) : (
            <MdClear
              onClick={handleClear}
              className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
            />
          )}
        </div>
      </div>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {/* Header row */}
        <div className="grid grid-cols-5 bg-oliveGreen text-white font-semibold p-4">
          <div className="text-left px-2">Homeowners</div>
          <div className="text-left px-2">Overdue Months</div>
          <div className="text-center px-2">No. of months</div>
          <div className="text-center px-2">Amount</div>
          {/* <div className="text-center px-2">Accrued Interest</div> */}
          <div className="text-center px-2">Action</div>
        </div>

        {/* Data rows */}
        <div className="divide-y">
          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center">
              <LoadingContainer color="green" size={50} />
            </div>
          ) : residents.length > 0 ? (
            residents.map((resident, index) => (
              <div
                key={resident.id}
                className={`grid grid-cols-5 p-2 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-100 items-center`}
              >
                <div className="text-center p-2 truncate max-w-xs">
                  {formatUserName(resident.resident.user, true)}
                </div>
                <div className="text-center p-2">
                  {resident.overdueMonths.slice(0, 2).map((month, index) => (
                    <span key={month}>
                      {new Date(month).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                      {index < resident.overdueMonths.slice(0, 2).length - 1 &&
                        ", "}
                    </span>
                  ))}
                  {resident.overdueMonths.length > 2 && " ..."}
                </div>

                <div className="text-center p-2">
                  {resident.numOverdueMonths}
                </div>
                <div className="text-center p-2">{resident.totalAmount}</div>
                {/* <div className="text-center p-2">
                  {resident.accruedInterest}
                </div> */}
                <div className="text-center">
                  <button
                    className="bg-green p-2 text-white rounded-lg hover:bg-secondary w-20"
                    onClick={() => handleViewClick(resident)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-2">No overdue residents found.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 opact">
        <ReactPaginate
          pageCount={lastPage}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination rounded-md"
          breakLabel="..."
          nextLabel={"next >"}
          previousLabel={"< previous"}
          renderOnZeroPageCount={null}
          disabledClassName="pagination-disabled"
          pageClassName="text-white"
          activeClassName="pagination-active"
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
};

export default OverdueBills;
