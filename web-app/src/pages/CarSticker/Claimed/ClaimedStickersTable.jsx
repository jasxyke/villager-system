import React, { useEffect, useState } from "react";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import ReactPaginate from "react-paginate";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import { formatUserName } from "../../../utils/DataFormatter";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const ClaimedStickersTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);

  // Use the custom hook to fetch claimed car sticker requests
  const {
    fetchRequestsByStatus,
    requests,
    loading,
    error,
    currentPage,
    lastPage,
    changePage,
  } = useCarStickerRequestsByStatus();

  useEffect(() => {
    // Fetch "claimed" requests when the component mounts
    fetchRequestsByStatus("claimed", 1); // Default to page 1 on mount
  }, []);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  const handlePageClick = (event) => {
    // Paginate to the selected page
    changePage("claimed", event.selected + 1);
  };

  if (error) {
    return <div>{error}</div>; // Handle error state
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
                Claimed Date
              </div>
              <div className="flex items-center justify-center">Status</div>
            </div>
          </div>
          <div>
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : requests.length === 0 ? (
              <div className="text-center p-4 w-full">
                No claimed sticker requests found.
              </div>
            ) : (
              <div className="w-full">
                {requests.map((sticker) => (
                  <div
                    key={sticker.id}
                    className="grid grid-cols-4 gap-4 p-4 border-b border-gray-300 bg-white hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(sticker)}
                  >
                    <div className="flex items-center justify-center">
                      {formatUserName(sticker.resident.user, false)}
                    </div>
                    <div className="flex items-center justify-center">
                      {sticker.car_plate_number}
                    </div>
                    <div className="flex items-center justify-center">
                      {sticker.claimed_date}
                    </div>
                    <div className="flex items-center justify-center">
                      Claimed
                    </div>
                  </div>
                ))}
              </div>
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

export default ClaimedStickersTable;
