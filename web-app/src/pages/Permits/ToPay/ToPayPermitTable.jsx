import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import usePermitRequests from "../../../hooks/usePermitRequests";

const ToPayPermitTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { permitRequests, loading } = usePermitRequests();

  const paginatedRequests = permitRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const pageCount = Math.ceil(permitRequests.length / pageSize);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const handleAddPaymentClick = (permit) => {
    setSelectedPermit(permit);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPaymentAmount(0);
    setErrorMessage("");
  };

  const handlePaymentAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setPaymentAmount(value >= 0 ? value : 0);
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (paymentAmount <= 0) {
      setErrorMessage("Payment amount must be greater than 0.");
      return;
    }
    // Add logic to submit the payment using your API or state management
    alert(
      `Payment of ₱${paymentAmount} submitted for permit ID: ${selectedPermit.id}`
    );
    handleModalClose(); // Close modal after submission
  };

  return (
    <div className="overflow-x-auto">
      <div className="w-full mb-2">
        <div className="flex items-center justify-center font-medium bg-mutedGreen p-2 text-center">
          <div className="flex-1 p-2">Name</div>
          <div className="flex-1 p-2">Approved Date</div>
          <div className="flex-1 p-2">Purpose</div>
          <div className="flex-1 p-2">Status</div>
          <div className="flex-1 p-2">Action</div>
        </div>
      </div>

      <div>
        {loading ? (
          <LoadingContainer />
        ) : paginatedRequests.length > 0 ? (
          paginatedRequests.map((permit) => (
            <div
              key={permit.id}
              className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
            >
              <div className="flex-1 p-2 text-center">
                {permit.resident.user.firstname}
              </div>
              <div className="flex-1 p-2 text-center">
                {permit.approval_date}
              </div>
              <div className="flex-1 p-2 text-center">{permit.purpose}</div>
              <div className="flex-1 p-2 text-center">To Pay</div>
              <div className="flex-1 p-2 text-center">
                <button
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-greyGreen transition-colors"
                  onClick={() => handleAddPaymentClick(permit)}
                >
                  ADD PAYMENT
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No approved permit requests available.</p>
        )}
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel={"Next >"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={"< Previous"}
            renderOnZeroPageCount={null}
            className={"pagination flex space-x-2"}
            disabledClassName="text-gray-400 opacity-50"
            pageClassName="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            activeClassName="bg-blue-600 text-white rounded-md"
          />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold">Add Payment</h3>
            <button
              className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
              onClick={handleModalClose}
            >
              &times;
            </button>

            <form onSubmit={handleSubmitPayment} className="mt-4">
              <label className="block mb-2">Enter Payment Amount:</label>
              <input
                type="number"
                min="0"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
                className="w-full p-2 border rounded"
                required
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button
                type="submit"
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mt-4"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToPayPermitTable;
