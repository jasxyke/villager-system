import React, { useState, useEffect } from "react";
import OverdueViewDetails from "./OverdueViewDetails";
import useOverdueBills from "../../hooks/Bills/useOverDueBills"; // Adjust the import path as necessary
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";

const OverdueBills = () => {
  const [selectedBill, setSelectedBill] = useState(null);

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
      alert("Please select at least one bill to notify.");
    }
  };

  if (loading) return <LoadingContainer />;
  if (error) return <div>Error: {error.message}</div>;

  const handleViewClick = (bill) => setSelectedBill(bill);
  const handleBack = () => setSelectedBill(null);

  if (selectedBill)
    return <OverdueViewDetails bill={selectedBill} onBack={handleBack} />;

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {/* Header row */}
        <div className="grid grid-cols-6 bg-oliveGreen text-white font-semibold p-4">
          <div className="text-left px-2">Homeowners</div>
          <div className="text-left px-2">Overdue Months</div>
          <div className="text-center px-2">No. of months</div>
          <div className="text-center px-2">Amount</div>
          <div className="text-center px-2">Accrued Interest</div>
          <div className="text-center px-2">Action</div>
        </div>

        {/* Data rows */}
        <div className="divide-y">
          {bills.map((bill, index) => (
            <div
              key={bill.id} // Use bill.id for better key uniqueness
              className={`grid grid-cols-6 p-2 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-green-100`}
            >
              <div className="text-center p-2">
                {bill.resident.user.firstname} {bill.resident.user.lastname}
              </div>
              <div className="text-center p-2"></div>
              <div className="text-center p-2"></div>
              <div className="text-center p-2"></div>
              <div className="text-center p-2"></div>
              <div className="text-center">
                <button
                  className="bg-green p-2 text-white rounded-lg hover:bg-secondary w-20"
                  onClick={() => handleViewClick(bill)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          pageCount={lastPage}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default OverdueBills;
