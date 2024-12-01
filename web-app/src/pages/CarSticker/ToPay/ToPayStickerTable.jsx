import React, { useState, useEffect } from "react";
import StickerDetails from "../StickerDetails";
import StickerDefaultTable from "../StickerDefaultTable";
import useCarStickerRequestsByStatus from "../../../hooks/CarStickers/useCarStickerRequestsByStatus";
import { formatUserName } from "../../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import useStickerPayments from "../../../hooks/CarStickers/useStickerPayments";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";

const ToPayStickerTable = () => {
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [detailsView, setDetailsView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // For showing validation errors

  const {
    addStickerPayment,
    loading: paymentLoading,
    error: paymentError,
    success: paymentSuccess,
  } = useStickerPayments();

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
    fetchRequestsByStatus("approved", currentPage);
  }, [currentPage]);

  const handleRowClick = (sticker) => {
    setSelectedSticker(sticker);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedSticker(null);
    setDetailsView(false);
  };

  const handleAddPaymentClick = (sticker, e) => {
    e.stopPropagation();
    setSelectedSticker(sticker);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPaymentAmount(0);
    setErrorMessage(""); // Reset error message
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (paymentAmount <= 0) {
      setErrorMessage("Payment amount must be greater than 0.");
      return;
    }

    if (paymentAmount > totalAmount) {
      setErrorMessage("Payment amount cannot exceed the total amount to pay.");
      return;
    }

    if (selectedSticker) {
      const result = await addStickerPayment(
        selectedSticker.id,
        selectedSticker.resident_id,
        paymentAmount
      );

      if (result) {
        console.log("Payment added successfully:", result);
        alert("Payment added successfuly!");
        handleModalClose();
        fetchRequestsByStatus("approved", currentPage);
      }
    }
  };

  const handlePageClick = (event) => {
    changePage("approved", event.selected + 1);
  };

  const stickerFee = parseFloat(selectedSticker?.sticker_fee) || 0;
  const processingFee = parseFloat(selectedSticker?.processing_fee) || 0;
  const totalAmount = stickerFee + processingFee;

  const handlePaymentAmountChange = (e) => {
    const value = parseFloat(e.target.value);

    if (value < 0) {
      setErrorMessage("Payment amount cannot be negative.");
    } else if (value > totalAmount) {
      setErrorMessage("Payment amount cannot exceed the total amount to pay.");
    } else {
      setErrorMessage(""); // Clear any previous error
      setPaymentAmount(value);
    }
  };

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
              <div className="flex items-center justify-center">Type</div>

              <div className="flex items-center justify-center">Actions</div>
            </div>
          </div>

          <div>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : (
              requests.length === 0 &&
              !loading && (
                <StickerDefaultTable>
                  <div className="text-center p-4 w-full">
                    No approved sticker requests found.
                  </div>
                </StickerDefaultTable>
              )
            )}

            {requests.map((sticker) => (
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
                  {sticker.sticker_type}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-oliveGreen text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                    onClick={(e) => handleAddPaymentClick(sticker, e)}
                  >
                    ADD PAYMENT
                  </button>
                </div>
              </StickerDefaultTable>
            ))}
          </div>

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

      {isModalOpen && selectedSticker && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
          onClick={handleModalClose}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-gray-300 border-b-2">
              <h3 className="text-lg font-semibold">Add Payment</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleModalClose}
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <p>
                <span className="font-medium">Sticker Fee:</span>{" "}
                <b>₱{stickerFee.toFixed(2)}</b>
              </p>
              <p>
                <span className="font-medium">Processing Fee:</span>{" "}
                <b>₱{processingFee.toFixed(2)}</b>
              </p>
              <p>
                <span className="font-medium">Total Amount to Pay:</span>{" "}
                <b>₱{totalAmount.toFixed(2)}</b>
              </p>
            </div>

            {paymentError && <p className="text-red-500">{paymentError}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <form onSubmit={handleSubmitPayment} className="mt-4">
              <label className="block mb-2">Enter Payment Amount:</label>
              <div className="flex items-center border border-gray-300 rounded">
                <input
                  type="number"
                  step={"any"}
                  min={"0"}
                  value={paymentAmount}
                  onChange={handlePaymentAmountChange}
                  className="w-full p-2 border-0"
                  required
                />
              </div>

              {paymentLoading && <p>Processing payment...</p>}

              <div className="mt-4 flex gap-4">
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  disabled={paymentLoading}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

            {paymentSuccess && (
              <p className="text-green-500 mt-4">Payment added successfully!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToPayStickerTable;
