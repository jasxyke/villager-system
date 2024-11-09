import React, { useEffect, useState } from "react";
import StickerReview from "./StickerReview";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import { formatName, formatUserName } from "../../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import SelectOptions from "../../../components/forms/SelectOptions";

const options = [
  {
    value: "pending",
    text: "Pending",
  },
  {
    value: "rejected",
    text: "Rejected",
  },
];

const StickerTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);
  const [status, setStatus] = useState("pending");
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

  useEffect(() => {
    // Fetch pending requests when the component mounts
    fetchRequestsByStatus(status, currentPage); // Default to page 1 on mount
  }, [currentPage, status]);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleReviewClick = (sticker, e) => {
    e.stopPropagation();
    setSelectedSticker(sticker);
    setDetailsView(false);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  const handlePageClick = (event) => {
    // Paginate to the selected page
    changePage(status, event.selected + 1);
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
      ) : selectedSticker ? (
        <StickerReview
          sticker={selectedSticker}
          onBack={handleBack}
          onResponse={() => fetchRequestsByStatus(status, currentPage)}
        />
      ) : (
        <>
          <div className="w-full">
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Name</div>
              <div className="flex-1 p-2 text-center">Plate Number</div>
              <div className="flex-1 p-2 text-center">Request Date</div>
              <div className="flex-1 p-2 text-center">Status</div>
              <div className="flex-1 p-2 text-center">Action</div>
            </div>
          </div>
          <div>
            {requests.length === 0 ? (
              <StickerDefaultTable>
                <div className="text-center p-4 w-full">
                  No pending sticker requests found.
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
                    {sticker.application_date}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {formatName(sticker.request_status)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    <button
                      className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={(e) => handleReviewClick(sticker, e)}
                    >
                      Review
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

      {!detailsView && selectedSticker === null && (
        <SelectOptions
          list={options}
          onChangeValue={setStatus}
          value={status}
          label={"Status"}
          width={"auto"}
        />
      )}
    </div>
  );
};

export default StickerTable;
