import React, { useEffect, useState } from "react";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import ReactPaginate from "react-paginate";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import { formatUserName } from "../../../utils/DataFormatter";

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

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

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
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Name</div>
              <div className="flex-1 p-2 text-center">Plate Number</div>
              <div className="flex-1 p-2 text-center">Claimed Date</div>
              <div className="flex-1 p-2 text-center">Status</div>
            </div>
          </div>
          <div>
            {requests.length === 0 ? (
              <StickerDefaultTable>
                <div className="text-center p-4 w-full">
                  No claimed sticker requests found.
                </div>
              </StickerDefaultTable>
            ) : (
              requests.map((sticker) => (
                <StickerDefaultTable
                  key={sticker.id}
                  handleClick={() => handleRowClick(sticker)}
                >
                  <div className="flex-1 p-2 text-center">
                    {formatUserName(sticker.resident.user, false)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {sticker.car_plate_number}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {sticker.claimed_date}
                  </div>
                  <div className="flex-1 p-2 text-center">Claimed</div>
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

export default ClaimedStickersTable;
