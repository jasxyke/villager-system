import React, { useEffect, useState } from "react";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import useCarStickerRequests from "../../../hooks/CarStickers/useCarStickerRequests"; // Import the custom hook
import { formatUserName } from "../../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const ToClaimRequestTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  // Use the custom hook to fetch car sticker requests
  const {
    fetchRequestsByStatus,
    requests,
    loading,
    error,
    currentPage,
    lastPage,
    changePage,
  } = useCarStickerRequestsByStatus();

  const {
    claimCarStickerRequest, // Use the claim function from the hook
    loading: claimLoading,
    error: claimError,
    success: claimSuccess,
  } = useCarStickerRequests();

  useEffect(() => {
    // Fetch "to_claim" requests when the component mounts
    fetchRequestsByStatus("completed", currentPage); // Default to page 1 on mount
  }, [currentPage]);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  const handleSetAsClaimed = async (sticker, e) => {
    e.stopPropagation();
    const isConfirmed = window.confirm(
      "Are you sure you want to mark this sticker request as claimed?"
    );

    if (isConfirmed) {
      try {
        // Use the custom hook function to mark the request as claimed
        const responseSuccess = await claimCarStickerRequest(sticker.id);

        if (responseSuccess) {
          alert("Sticker request has been marked as claimed.");
          // Optionally refresh the data after marking as claimed
          fetchRequestsByStatus("completed", currentPage);
        }
      } catch (error) {
        console.error("Failed to mark the sticker as claimed", claimError);
        alert(
          "There was an error marking the sticker as claimed. Please try again."
        );
      }
    }
  };

  const handlePageClick = (event) => {
    // Paginate to the selected page
    changePage(event.selected + 1);
  };

  if (error || claimError) {
    return <div>{error || claimError}</div>; // Handle error state
  }

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <StickerDetails sticker={selectedSticker} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-4 p-4 bg-oliveGreen text-white font-bold">
              <div className="flex items-center justify-center">Name</div>
              <div className="flex items-center justify-center">
                Plate Number
              </div>
              <div className="flex items-center justify-center">
                Completion Date
              </div>
              <div className="flex items-center justify-center">Type</div>
              {/*<div className="flex items-center justify-center">Action</div>*/}
            </div>
          </div>
          <div>
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : requests.length === 0 ? (
              <StickerDefaultTable>
                <div className="text-center p-4 w-full">
                  No requests found to claim.
                </div>
              </StickerDefaultTable>
            ) : (
              requests.map((sticker) => (
                <div
                  key={sticker.id}
                  className="grid grid-cols-4 gap-4 p-4 bg-white"
                  handleClick={() => handleRowClick(sticker)}
                >
                  <div className="flex items-center justify-center">
                    {formatUserName(sticker.resident.user, false)}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.car_plate_number}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.completed_date}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.sticker_type}
                  </div>
                  {/*<div className="flex items-center justify-center">
                    <button
                      className="bg-oliveGreen text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={(e) => handleSetAsClaimed(sticker, e)} // Use the claim handler
                    >
                      Set as Claimed
                    </button>
                  </div>*/}
                </div>
              ))
            )}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {lastPage > 1 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel={"next>"}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={lastPage}
                previousLabel={"<previous"}
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

export default ToClaimRequestTable;
