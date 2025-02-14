import React, { useState, useEffect } from "react";
import useOverdueBills from "../../hooks/Bills/useOverDueBills";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const Reminders = () => {
  const {
    bills,
    loading,
    error,
    currentPage,
    lastPage,
    fetchBills,
    changePage,
    notifyResidents,
  } = useOverdueBills();

  const [selectedBills, setSelectedBills] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (selectAll) {
      setSelectedBills(bills.map((bill) => bill.id));
    } else {
      setSelectedBills([]);
    }
  }, [selectAll, bills]);

  const handlePageClick = (event) => {
    changePage(event.selected + 1);
  };

  const handleCheckboxChange = (billId) => {
    setSelectedBills((prevSelected) =>
      prevSelected.includes(billId)
        ? prevSelected.filter((id) => id !== billId)
        : [...prevSelected, billId]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleNotify = () => {
    if (selectedBills.length > 0) {
      notifyResidents(selectedBills);
    } else {
      showAlert("Please select at least one bill to notify.", true);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 bg-oliveGreen text-white font-semibold py-2 px-4 rounded-t">
        <div className="col-span-1 flex flex-wrap gap-y-2 items-center justify-center">
          <p>Select All</p>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="mr-2"
          />
        </div>
        <div className="col-span-3 flex items-center justify-center">
          Homeowner
        </div>
        <div className="col-span-2 flex items-center justify-center">
          Status
        </div>
        <div className="col-span-3 flex items-center justify-center">
          Due Date
        </div>
        <div className="col-span-3 flex items-center justify-center">
          Pending Payment
        </div>
      </div>
      <div className="divide-y divide-gray-300 h-[350px] overflow-x-auto">
        {loading ? (
          <LoadingContainer color="green" bgColor="white" />
        ) : bills.length > 0 ? (
          bills.map((bill, index) => (
            <div
              key={bill.id}
              className={`grid grid-cols-12 gap-4 p-4 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <div className="col-span-1 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedBills.includes(bill.id)}
                  onChange={() => handleCheckboxChange(bill.id)}
                  className="mr-2"
                />
              </div>
              <div className="col-span-3 flex items-center justify-center text-gray-900">
                {bill.resident.user.firstname} {bill.resident.user.lastname}
              </div>
              <div className="col-span-2 flex items-center justify-center text-gray-700">
                {bill.status}
              </div>
              <div className="col-span-3 flex items-center justify-center text-gray-700">
                {bill.due_date}
              </div>
              <div className="col-span-3 flex items-center justify-center text-gray-900">
                {bill.amount}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No overdue bills available</div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleNotify}
          className="bg-secondary text-white rounded-lg px-4 py-2 hover:bg-paleGreen mt-4"
        >
          Notify Selected
        </button>
      </div>

      {/* Pagination Controls */}
      {lastPage > 1 && (
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
      )}
    </div>
  );
};

export default Reminders;
