import React, { useState, useEffect } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import useUpdatePermitRequests from "../../../hooks/Permits/useUpdatePermitRequests"; // Import the new hook
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate";
import { formatUserName } from "../../../utils/DataFormatter";

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
  } = useUpdatePermitRequests(); // Destructure the new hook

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
      const response = await completePermitRequest(permit.id); // Call the new hook function
      if (response) {
        // Optionally handle the success response, e.g., show a notification
        alert("Permit marked as done successfully!");
        changePage("in_progress", currentPage); // Refresh the data if needed
      } else {
        alert(completeError || "Failed to mark permit as done."); // Show error if any
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
        <>
          <div className="w-full mb-2">
            <div className="flex items-center justify-center font-medium bg-mutedGreen p-2 text-center">
              <div className="flex-1 p-2">Name</div>
              <div className="flex-1 p-2">Approved Date</div>
              <div className="flex-1 p-2">Purpose</div>
              <div className="flex-1 p-2">Status</div>
              <div className="flex-1 p-2">Action</div>
            </div>
          </div>

          <div>
            {loading ? (
              <LoadingContainer />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4 w-full">
                No permits in progress.
              </div>
            ) : (
              permitRequests.map((permit) => (
                <div
                  key={permit.id}
                  className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                  onClick={() => handleRowClick(permit)}
                >
                  <div className="flex-1 p-2 text-center">
                    {formatUserName(permit.resident.user, false)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {permit.approval_date}
                  </div>
                  <div className="flex-1 p-2 text-center">{permit.purpose}</div>
                  <div className="flex-1 p-2 text-center">In Progress</div>
                  <div className="flex-1 p-2 text-center">
                    <button
                      className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={(e) => handleMarkAsDone(permit, e)} // Pass event to handleMarkAsDone
                      disabled={completing} // Disable button while completing
                    >
                      {completing ? "Marking..." : "Mark as Done"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-4">
            {lastPage > 1 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel={"next >"}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={lastPage}
                previousLabel={"< previous"}
                renderOnZeroPageCount={null}
                className={"pagination rounded-md"}
                disabledClassName="text-grey opacity-50"
                pageClassName="text-white"
                activeClassName="bg-paleGreen px-2"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InProgressTable;
