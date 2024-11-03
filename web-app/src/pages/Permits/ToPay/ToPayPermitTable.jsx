import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import PermitDetails from "../PermitDetails"; // Import PermitDetails component
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import usePermitPayments from "../../../hooks/Permits/usePermitPayments";
import styles from "../PermitStyles.module.css";
import { formatUserName } from "../../../utils/DataFormatter";

const ToPayPermitTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailsView, setDetailsView] = useState(false); // Track details view

  const {
    permitRequests,
    loading: requestsLoading,
    error: requestsError,
    currentPage,
    lastPage,
    fetchPermitRequests,
    changePage,
  } = usePermitRequests();

  const {
    addPermitPayment,
    loading: paymentLoading,
    error: paymentError,
    success: paymentSuccess,
  } = usePermitPayments();

  useEffect(() => {
    fetchPermitRequests("to_pay");
  }, []);

  useEffect(() => {
    if (paymentSuccess) {
      setIsModalOpen(false);
      setPaymentAmount("");
      fetchPermitRequests("to_pay", currentPage); // Refresh permit requests on successful payment
    }
    if (requestsError) {
      setErrorMessage(requestsError);
    }
  }, [paymentSuccess, requestsError]);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true); // Switch to details view on row click
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPaymentAmount("");
    setErrorMessage("");
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false); // Return to table view
    fetchPermitRequests("to_pay", currentPage);
  };

  const handlePageClick = (data) => {
    changePage("to_pay", data.selected + 1);
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
    setErrorMessage(""); // Clear error message on input change
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (selectedPermit) {
      const { id: permitRequestId, resident_id: residentId } = selectedPermit;
      const totalAmount =
        parseFloat(selectedPermit.permit_fee) +
        parseFloat(selectedPermit.processing_fee);
      const amount = parseFloat(paymentAmount);

      if (amount <= 0) {
        setErrorMessage("Payment amount must be greater than zero.");
        return;
      }
      if (amount > totalAmount) {
        setErrorMessage("Payment amount cannot exceed the total fee.");
        return;
      }

      const response = await addPermitPayment(
        permitRequestId,
        residentId,
        amount
      );
      if (response) {
        alert(response);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-full">
        {detailsView ? (
          <PermitDetails permit={selectedPermit} onBack={handleBack} />
        ) : (
          <div>
            <div className="flex items-center justify-center font-medium bg-mutedGreen mb-2 p-2 text-center">
              <div className="flex-1 p-2 text-center">Permit ID</div>
              <div className="flex-1 p-2 text-center">Resident</div>
              <div className="flex-1 p-2 text-center">Permit Fee</div>
              <div className="flex-1 p-2 text-center">Processing Fee</div>
              <div className="flex-1 p-2 text-center">Total Amount</div>
              <div className="flex-1 p-2 text-center">Actions</div>
            </div>

            {requestsLoading ? (
              <LoadingContainer />
            ) : requestsError ? (
              <p className="text-red-500">{requestsError}</p>
            ) : permitRequests.length > 0 ? (
              permitRequests.map((permit) => (
                <div
                  key={permit.id}
                  className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                  onClick={() => handleRowClick(permit)}
                >
                  <div className="flex-1 p-2 text-center">{permit.id}</div>
                  <div className="flex-1 p-2 text-center">
                    {formatUserName(permit.resident.user, false)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    ₱{parseFloat(permit.permit_fee).toFixed(2)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    ₱{parseFloat(permit.processing_fee).toFixed(2)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    ₱
                    {(
                      parseFloat(permit.permit_fee) +
                      parseFloat(permit.processing_fee)
                    ).toFixed(2)}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPermit(permit);
                        setIsModalOpen(true);
                      }}
                      className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                    >
                      Add Payment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No permit requests available</p>
            )}
          </div>
        )}

        {!detailsView && (
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
                className={"pagination rounded-md"}
                disabledClassName="text-grey opacity-50"
                pageClassName="text-white"
                activeClassName="bg-paleGreen px-2"
              />
            )}
          </div>
        )}
      </div>

      {isModalOpen && selectedPermit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold">Add Payment</h3>
            <button
              className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
              onClick={handleModalClose}
            >
              &times;
            </button>
            <div className="mt-4">
              <p>
                <strong>Permit Fee:</strong> ₱
                {parseFloat(selectedPermit?.permit_fee).toFixed(2)}
              </p>
              <p>
                <strong>Processing Fee:</strong> ₱
                {parseFloat(selectedPermit?.processing_fee).toFixed(2)}
              </p>
              <p>
                <strong>Total Amount to Pay:</strong> ₱
                {(
                  parseFloat(selectedPermit?.permit_fee) +
                  parseFloat(selectedPermit?.processing_fee)
                ).toFixed(2)}
              </p>
            </div>
            <form onSubmit={handleSubmitPayment} className="mt-4">
              <label className="block mb-2">Enter Payment Amount:</label>
              <input
                type="number"
                min="0"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
                className={`w-full p-2 border rounded ${
                  errorMessage ? "border-red-500" : ""
                }`}
                required
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button
                type="submit"
                className="mr-4 bg-secondary text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4"
                disabled={paymentLoading}
              >
                {paymentLoading ? "Processing..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mt-2"
              >
                Cancel
              </button>
              {paymentError && <p className="text-red-500">{paymentError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToPayPermitTable;
