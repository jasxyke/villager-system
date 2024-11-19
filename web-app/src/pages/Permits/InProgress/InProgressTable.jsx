import React, { useState, useEffect } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import useUpdatePermitRequests from "../../../hooks/Permits/useUpdatePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate";
import { formatUserName } from "../../../utils/DataFormatter";
import styles from "../PermitStyles.module.css";

const InProgressTable = () => {
  const [detailsView, setDetailsView] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const { permitRequests, loading, error, currentPage, lastPage, changePage } =
    usePermitRequests();
  const {
    completePermitRequest,
    loading: completing,
    error: completeError,
    success,
  } = useUpdatePermitRequests();

  useEffect(() => {
    changePage("in_progress", currentPage);
  }, [currentPage]);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  const handleMarkAsDone = async (permit, e) => {
    e.stopPropagation();
    const confirm = window.confirm(
      "Are you sure you want to mark this permit as done?"
    );
    if (confirm) {
      const response = await completePermitRequest(permit.id);
      if (response) {
        alert("Permit marked as done successfully!");
        changePage("in_progress", currentPage); // Refresh the data if needed
      } else {
        alert(completeError || "Failed to mark permit as done.");
      }
    }
  };

  const handlePageClick = (event) => {
    changePage("in_progress", event.selected + 1);
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
            <div className="flex items-center justify-center">Approved Date</div>
            <div className="flex items-center justify-center">Purpose</div>
            <div className="flex items-center justify-center">Status</div>
            <div className="flex items-center justify-center">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-300 h-[350px] overflow-y-auto">
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : error ? (
              <p className="text-red-500 text-center p-4">{error}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4">No permits in progress.</div>
            ) : (
              permitRequests.map((permit, index) => (
              <div
                key={permit.id}
                className={`grid grid-cols-5 gap-4 p-4 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 cursor-pointer text-black`} // Updated text color to black
                onClick={() => handleRowClick(permit)}
                >
                <div className="flex items-center justify-center">
                  {formatUserName(permit.resident.user, false)}
                </div>
                <div className="flex items-center justify-center">
                  {permit.approval_date}
                </div>
                <div className="flex items-center justify-center">
                  {permit.purpose}
                </div>
                <div className="flex items-center justify-center">In Progress</div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-oliveGreen text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                    onClick={(e) => handleMarkAsDone(permit, e)}
                    disabled={completing}
                  >
                    {completing ? "Marking..." : "Mark as Done"}
                  </button>
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

export default InProgressTable;
