import React, { useState, useEffect } from "react";
import useBills from "../../hooks/Bills/useBills";
import EditBillModal from "./EditBillModal";
import { formatFullName, formatName } from "../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import ViewPaidBillModal from "./VIewPaidBillModal";

const BillList = ({
  status,
  month,
  year,
  searchQuery,
  searchPressed,
  setSearchPressed,
}) => {
  const {
    bills,
    fetchBills,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    changePage,
  } = useBills();
  const [selectedBill, setSelectedBill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false); // Track if the modal is for viewing

  useEffect(() => {
    // Fetch bills based on filters
    fetchBills(status, month, year, searchQuery, currentPage);
  }, [status, month, year]);

  useEffect(() => {
    if (searchPressed === true) {
      fetchBills(status, month, year, searchQuery, currentPage);
      setSearchPressed(false);
    }
    if (searchQuery === "") {
      fetchBills(status, month, year, searchQuery, currentPage);
    }
  }, [searchPressed, searchQuery]);

  const openModal = (bill) => {
    setSelectedBill(bill);
    setIsViewMode(bill.status === "paid"); // Use ViewBillModal if the bill is paid
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBill(null);
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    alert("Bill updated successfully");
    fetchBills(status, month, year, searchQuery, currentPage);
  };

  const handlePageClick = (event) => {
    changePage(status, month, year, searchQuery, event.selected + 1);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-full rounded-t shadow-lg">
          <div className="grid grid-cols-7 gap-4 p-2 bg-oliveGreen text-white font-semibold rounded-t">
            <div className="flex items-center justify-center">Homeowner</div>
            <div className="flex items-center justify-center">Address</div>
            <div className="flex items-center justify-center">Issue Date</div>
            <div className="flex items-center justify-center">Due Date</div>
            <div className="flex items-center justify-center">Amount</div>
            <div className="flex items-center justify-center">Status</div>
            <div className="flex items-center justify-center">Action</div>
          </div>
          <div className="divide-y divide-gray-300 h-[350px] overflow-y-auto">
            {loading ? (
              <LoadingContainer color="green" bgColor="white" />
            ) : bills.length > 0 ? (
              bills.map((bill, index) => (
                <div
                  key={bill.id}
                  className={`grid grid-cols-7 gap-4 p-4 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <div className="flex items-center justify-center text-center">
                    {formatFullName(
                      bill.resident.user.firstname,
                      bill.resident.user.middlename,
                      bill.resident.user.lastname,
                      false
                    )}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {`BLK ${bill.resident.house.block} LOT ${bill.resident.house.lot}`}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {bill.issue_date}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {bill.due_date}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {bill.amount}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    {formatName(bill.status)}
                  </div>
                  <div className="flex items-center justify-center text-center">
                    <button
                      onClick={() => openModal(bill)}
                      className="text-white bg-oliveGreen rounded-xl w-28 p-2 hover:underline"
                    >
                      {bill.status === "paid" ? "View" : "Edit"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4 bg-white">No bills available</div>
            )}
          </div>
        </div>
      </div>

      {selectedBill &&
        (isViewMode ? (
          <ViewPaidBillModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            bill={selectedBill}
          />
        ) : (
          <EditBillModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            bill={selectedBill}
            onSuccess={handleSuccess}
          />
        ))}

      {/* Pagination Controls using React Paginate */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel={"next >"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={lastPage}
          previousLabel={"< previous"}
          renderOnZeroPageCount={null}
          className={"pagination rounded-md"}
          disabledClassName="text-grey opacity-50"
          pageClassName="text-white"
          activeClassName="bg-paleGreen px-2"
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default BillList;
