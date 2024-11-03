import React, { useState, useEffect } from "react";
import PermitDetails from "../PermitDetails"; // Import the PermitDetails component
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import useUpdatePermitRequests from "../../../hooks/Permits/useUpdatePermitRequests"; // Import the custom hook
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate";
import { formatName } from "../../../utils/DataFormatter";

const ToClaimPermitsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsView, setDetailsView] = useState(false); // State for details view
  const [selectedPermit, setSelectedPermit] = useState(null); // State for the selected permit
  const { permitRequests, loading, error, lastPage, changePage } =
    usePermitRequests();

  // Use the custom hook for updating permit requests
  const {
    claimPermitRequest, // Use the claim function from the hook
    loading: claimLoading,
    error: claimError,
    success: claimSuccess,
  } = useUpdatePermitRequests();

  useEffect(() => {
    changePage("to_claim", currentPage);
  }, [currentPage]);

  const handleSetClaimed = async (permit) => {
    const confirm = window.confirm(
      "Are you sure this permit is already claimed?"
    );
    if (confirm) {
      try {
        // Use the custom hook function to mark the request as claimed
        const responseSuccess = await claimPermitRequest(permit.id);
        if (responseSuccess) {
          alert(responseSuccess);
          // Optionally, refresh the permit requests list
          changePage("to_claim", currentPage);
        }
      } catch (error) {
        console.error("Failed to mark the permit as claimed", claimError);
        alert(
          "There was an error marking the permit as claimed. Please try again."
        );
      }
    }
  };

  const handleRowClick = (permit) => {
    setSelectedPermit(permit); // Set the selected permit
    setDetailsView(true); // Show the details view
  };

  const handleBack = () => {
    setSelectedPermit(null); // Clear the selected permit
    setDetailsView(false); // Hide the details view
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
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
              <div className="flex-1 p-2">Completed Date</div>
              <div className="flex-1 p-2">Type</div>
              <div className="flex-1 p-2">Status</div>
              <div className="flex-1 p-2">Action</div>
            </div>
          </div>

          <div>
            {loading || claimLoading ? (
              <LoadingContainer />
            ) : error || claimError ? (
              <p className="text-red-500">{error || claimError}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4 w-full">No permits to claim.</div>
            ) : (
              permitRequests.map((permit) => (
                <div
                  key={permit.id}
                  className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                  onClick={() => handleRowClick(permit)} // Make the row clickable
                >
                  <div className="flex-1 p-2 text-center">
                    {permit.resident.user.firstname}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {permit.completed_date}
                  </div>
                  <div className="flex-1 p-2 text-center">{permit.purpose}</div>
                  <div className="flex-1 p-2 text-center">
                    {formatName(permit.permit_status)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    <button
                      className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click event
                        handleSetClaimed(permit);
                      }} // Use the updated claim handler
                    >
                      Set as Claimed
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

export default ToClaimPermitsTable;
