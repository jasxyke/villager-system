import React, { useState, useEffect } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate"; // Add pagination support
import { formatName } from "../../../utils/DataFormatter";
import styles from "../PermitStyles.module.css";

const CompletedTable = () => {
  const [detailsView, setDetailsView] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const { permitRequests, loading, error, currentPage, lastPage, changePage } =
    usePermitRequests(); // Use the custom hook

  useEffect(() => {
    changePage("claimed", currentPage); // Fetch completed permits
  }, [currentPage]);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  const handlePageClick = (event) => {
    changePage("claimed", event.selected + 1); // Handle pagination
  };

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <PermitDetails permit={selectedPermit} onBack={handleBack} />
      ) : (
        <div className="min-w-full rounded-t shadow-lg">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-2 bg-oliveGreen text-white font-semibold rounded-t">
            <div className="flex items-center justify-center">Name</div>
            <div className="flex items-center justify-center">Completed Date</div>
            <div className="flex items-center justify-center">Claimed Date</div>
            <div className="flex items-center justify-center">Type</div>
            <div className="flex items-center justify-center">Status</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-300 h-[350px] overflow-y-auto">
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : error ? (
              <p className="text-red-500 text-center p-4">{error}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4 bg-white">
                No completed permits found.
              </div>
            ) : (
              permitRequests.map((permit, index) => (
                <div
                  key={permit.id}
                  className={`grid grid-cols-5 gap-4 p-4 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 cursor-pointer`}
                  onClick={() => handleRowClick(permit)}
                >
                  <div className="flex items-center justify-center">
                    {permit.resident.user.firstname}
                  </div>
                  <div className="flex items-center justify-center">
                    {permit.completed_date || "N/A"}
                  </div>
                  <div className="flex items-center justify-center">
                    {permit.claimed_date || "N/A"}
                  </div>
                  <div className="flex items-center justify-center">
                    {permit.purpose}
                  </div>
                  <div className="flex items-center justify-center">
                    {formatName(permit.permit_status)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {lastPage > 1 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={lastPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                className="pagination rounded-md"
                disabledClassName="text-grey opacity-50"
                pageClassName="text-white"
                activeClassName="bg-paleGreen px-2"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedTable;
