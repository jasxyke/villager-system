import React, { useEffect, useState } from "react";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import ReactPaginate from "react-paginate";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import useCarStickerRequests from "../../../hooks/CarStickers/useCarStickerRequests"; // Import the custom hook
import { formatUserName } from "../../../utils/DataFormatter";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const InProgressStickerTable = () => {
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

  // Use the custom hook to complete car sticker requests
  const {
    completeCarStickerRequest,
    loading: completeLoading,
    error: completeError,
  } = useCarStickerRequests();

  useEffect(() => {
    // Fetch "in_progress" requests when the component mounts
    fetchRequestsByStatus("in_progress", 1); // Default to page 1 on mount
  }, []);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  const handleMarkAsDone = async (sticker, e) => {
    e.stopPropagation(); // Prevent row click from being triggered

    const isConfirmed = window.confirm(
      "Are you sure you want to mark this sticker request as done?"
    );

    if (isConfirmed) {
      try {
        // Call the completeCarStickerRequest function
        const response = await completeCarStickerRequest(sticker.id);

        if (response) {
          // Refresh or update the state to reflect the completed status
          console.log(`Sticker ${sticker.id} marked as done.`);
          fetchRequestsByStatus("in_progress", currentPage); // Optionally refetch the current page of data
        }
      } catch (error) {
        console.error("Failed to mark the sticker request as done:", error);
      }
    }
  };

  const handlePageClick = (event) => {
    // Paginate to the selected page
    changePage("in_progress", event.selected + 1);
  };

  if (error || completeError) {
    return <div>{error || completeError}</div>; // Handle error state
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
                Approved Date
              </div>
              <div className="flex items-center justify-center">Actions</div>
            </div>
          </div>
          <div className="max-h-[400px] overflow-auto">
            {loading || completeLoading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : requests.length === 0 ? (
              <StickerDefaultTable cols={"1"}>
                <div className="text-center p-4 w-full">
                  No in-progress sticker requests found.
                </div>
              </StickerDefaultTable>
            ) : (
              requests.map((sticker) => (
                <StickerDefaultTable
                  key={sticker.id}
                  handleClick={() => handleRowClick(sticker)}
                  cols={"4"}
                >
                  <div className="flex items-center justify-center">
                    {formatUserName(sticker.resident.user, false)}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.car_plate_number}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.approval_date}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-oliveGreen text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={(e) => handleMarkAsDone(sticker, e)} // Pass event to handler
                    >
                      Mark as Done
                    </button>
                  </div>
                </StickerDefaultTable>
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

export default InProgressStickerTable;
