import React, { useEffect, useState } from "react";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import ReactPaginate from "react-paginate";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import useCarStickerRequests from "../../../hooks/CarStickers/useCarStickerRequests"; // Import the custom hook
import { formatName, formatUserName } from "../../../utils/DataFormatter";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import { useAlert } from "../../../contexts/AlertBox/AlertContext";

const InProgressStickerTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalSticker, setModalSticker] = useState(null);
  const { showAlert } = useAlert();

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

  const handleOpenModal = (sticker) => {
    setModalSticker(sticker);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalSticker(null);
  };

  const handleSetAsDone = async () => {
    if (modalSticker) {
      try {
        const response = await completeCarStickerRequest(modalSticker.id);
        if (response) {
          showAlert("Sticker marked as done successfully.", false);
          setShowModal(false);
          fetchRequestsByStatus("in_progress", currentPage); // Refresh data
        }
      } catch (error) {
        console.error("Failed to mark the sticker request as done:", error);
        showAlert(
          "Failed to mark the sticker request as done. Please try again.",
          true
        );
      }
    }
  };

  const handlePageClick = (event) => {
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
            <div className="grid grid-cols-5 gap-4 p-4 bg-oliveGreen text-white font-bold">
              <div className="flex items-center justify-center">Name</div>
              <div className="flex items-center justify-center">
                Plate Number
              </div>
              <div className="flex items-center justify-center">
                Approved Date
              </div>
              <div className="flex items-center justify-center">Type</div>
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
                  cols={"5"}
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
                    {formatName(sticker.sticker_type)}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-oliveGreen text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleOpenModal(sticker);
                      }}
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

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Completion
                </h2>
                <p className="mb-2">
                  <strong>Reference Number:</strong>{" "}
                  {modalSticker.reference_number}
                </p>
                <p className="mb-2">
                  <strong>Resident Name:</strong>{" "}
                  {formatUserName(modalSticker.resident.user, false)}
                </p>
                <p className="mb-4">
                  <strong>Plate Number:</strong> {modalSticker.car_plate_number}
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-oliveGreen text-white rounded hover:bg-greyGreen"
                    onClick={handleSetAsDone}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InProgressStickerTable;
