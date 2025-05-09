import React, { useEffect, useState } from "react";
import StickerReview from "./StickerReview";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import { formatName, formatUserName } from "../../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import SelectOptions from "../../../components/forms/SelectOptions";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

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
    fetchRequestsByStatus(status, currentPage);
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
    changePage(status, event.selected + 1);
  };

  if (error) {
    return <div>{error}</div>; // Handle error state
  }

  console.log(`status: ${status}`);

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
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-oliveGreen text-white font-bold">
            <div className="flex items-center justify-center">Name</div>
            <div className="flex items-center justify-center">Plate Number</div>
            <div className="flex items-center justify-center">Request Date</div>
            <div className="flex items-center justify-center">Action</div>
          </div>

          {/* Table Rows */}
          <div className="max-h-[400px] overflow-auto">
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : requests.length === 0 ? (
              <StickerDefaultTable cols={"1"}>
                <div className="text-center p-4 w-full">
                  No {status} sticker requests found.
                </div>
              </StickerDefaultTable>
            ) : (
              requests.map((sticker) => (
                <div
                  key={sticker.id}
                  className="grid grid-cols-4 gap-4 p-4 bg-white cursor-pointer"
                  onClick={() => handleRowClick(sticker)}
                >
                  <div className="flex items-center justify-center">
                    {formatUserName(sticker.resident.user, false)}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.car_plate_number}
                  </div>
                  <div className="flex items-center justify-center">
                    {sticker.application_date}
                  </div>
                  <div className="flex items-center justify-center">
                    {status !== "rejected" ? (
                      <button
                        className="bg-oliveGreen text-white px-4 py-2 rounded-xl hover:bg-greyGreen transition"
                        onClick={(e) => handleReviewClick(sticker, e)}
                      >
                        Review
                      </button>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
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
                className="pagination rounded-md text-white"
                disabledClassName="text-gray-500 opacity-50"
                pageClassName="px-2"
                activeClassName="bg-paleGreen"
              />
            )}
          </div>
        </>
      )}

      {/* Filter Options */}
      {!detailsView && selectedSticker === null && (
        <SelectOptions
          list={options}
          onChangeValue={setStatus}
          value={status}
          label="Status"
          width="auto"
        />
      )}
    </div>
  );
};

export default StickerTable;
