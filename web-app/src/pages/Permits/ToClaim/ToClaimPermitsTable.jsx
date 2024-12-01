import React, { useState, useEffect } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import useUpdatePermitRequests from "../../../hooks/Permits/useUpdatePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate";
import { formatUserName } from "../../../utils/DataFormatter";

const ToClaimPermitsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsView, setDetailsView] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPermit, setModalPermit] = useState(null);

  const { permitRequests, loading, error, lastPage, changePage } =
    usePermitRequests();

  const {
    claimPermitRequest,
    loading: claimLoading,
    error: claimError,
    success: claimSuccess,
  } = useUpdatePermitRequests();

  useEffect(() => {
    changePage("to_claim", currentPage);
  }, [currentPage]);

  const handleSetClaimed = async () => {
    if (modalPermit) {
      try {
        const responseSuccess = await claimPermitRequest(modalPermit.id);
        if (responseSuccess) {
          alert(responseSuccess);
          setShowModal(false);
          changePage("to_claim", currentPage); // Refresh data
        }
      } catch (error) {
        console.error("Failed to mark permit as claimed", claimError);
        alert(
          "There was an error marking the permit as claimed. Please try again."
        );
      }
    }
  };

  const handleOpenModal = (permit) => {
    setModalPermit(permit);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalPermit(null);
  };

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
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
          <div className="min-w-full rounded-t shadow-lg">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-2 bg-oliveGreen text-white font-semibold rounded-t">
              <div className="flex items-center justify-center">Name</div>
              <div className="flex items-center justify-center">
                Completed Date
              </div>
              <div className="flex items-center justify-center">Type</div>
              <div className="flex items-center justify-center">Action</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-300 h-[350px] overflow-y-auto">
              {loading || claimLoading ? (
                <LoadingContainer color="green" bgColor="white" />
              ) : error || claimError ? (
                <p className="text-red-500 text-center p-4">
                  {error || claimError}
                </p>
              ) : permitRequests.length === 0 ? (
                <div className="text-center p-4 bg-gray-50">
                  No permits to claim.
                </div>
              ) : (
                permitRequests.map((permit, index) => (
                  <div
                    key={permit.id}
                    className={`grid grid-cols-4 gap-4 p-4 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 cursor-pointer text-black`}
                    onClick={() => handleRowClick(permit)}
                  >
                    <div className="flex items-center justify-center">
                      {formatUserName(permit.resident.user, false)}
                    </div>
                    <div className="flex items-center justify-center">
                      {permit.completed_date}
                    </div>
                    <div className="flex items-center justify-center">
                      {permit.purpose}
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        className="bg-oliveGreen text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click event
                          handleOpenModal(permit);
                        }}
                      >
                        Set as Claimed
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
                  nextLabel={"next >"}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={lastPage}
                  previousLabel={"< previous"}
                  renderOnZeroPageCount={null}
                  className="pagination rounded-md"
                  disabledClassName="text-grey opacity-50"
                  pageClassName="text-white"
                  activeClassName="bg-paleGreen px-2"
                />
              )}
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Confirm Reference Number
                </h2>
                <p className="mb-2">
                  <strong>Resident Name:</strong>{" "}
                  {formatUserName(modalPermit.resident.user, false)}
                </p>
                <p className="mb-4">
                  <strong>Reference Number:</strong>{" "}
                  {modalPermit.reference_number}
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
                    onClick={handleSetClaimed}
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

export default ToClaimPermitsTable;
