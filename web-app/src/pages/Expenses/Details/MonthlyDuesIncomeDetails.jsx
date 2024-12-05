import React, { useEffect, useState } from "react";
import useTransactions from "../../../hooks/useTransactions";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import { formatFullName } from "../../../utils/DataFormatter";

const MonthlyDuesIncomeDetails = ({ onClose }) => {
  const {
    transactions,
    loading,
    error,
    currentPage,
    lastPage,
    fetchTransactions,
    changePage,
  } = useTransactions();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  // Fetch transactions when component mounts or when selectedMonth/selectedYear change
  useEffect(() => {
    fetchTransactions("", "", "", 1, selectedMonth, selectedYear); // Pass month and year as filters
  }, [selectedMonth, selectedYear]);

  const handlePageClick = (event) => {
    changePage("", "", "", event.selected + 1); // Passing default params for page change
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value); // Update selected month
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value); // Update selected year
  };

  // Filter transactions by the selected month and year
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    return (
      transactionDate.getMonth() + 1 === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
    );
  });

  // Calculate the total amount for the filtered transactions
  const getTotalAmount = () => {
    return filteredTransactions.reduce((total, transaction) => {
      return (
        total + (isNaN(transaction.amount) ? 0 : parseFloat(transaction.amount))
      );
    }, 0);
  };

  const totalAmount = getTotalAmount();

  if (error) return <div>Error: {error.message}</div>;

  // Generate an array of months for the dropdown (1 to 12)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate a list of years for the dropdown (e.g., last 5 years)
  const years = Array.from({ length: 5 }, (_, index) => selectedYear - index);

  return (
    <div className="relative bg-white p-4 max-w-5xl w-full left-36">
      <div className="flex justify-between p-4">
        <div className="p-2">TOTAL INCOME</div>
        {/* Close Button */}
        <button
          className="p-4 w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full hover:bg-red-600 transition duration-200"
          onClick={onClose} // Close the details view
        >
          X
        </button>
      </div>

      {/* Dropdown to select Month and Year */}
      <div className="flex justify-center gap-4 py-4">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="p-2 border border-gray-300 rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Display the Total Amount */}
      <div className="text-center font-bold text-lg py-4">
        Total Income for {months[selectedMonth - 1]} {selectedYear}: ₱
        {totalAmount.toFixed(2)}
      </div>

      <div className="grid grid-cols-3 gap-4 bg-oliveGreen text-white font-semibold py-2 px-4 rounded-t">
        <div className="flex items-center justify-center">Payer</div>
        <div className="flex items-center justify-center">Date</div>
        <div className="flex items-center justify-center">Amount</div>
      </div>
      <div className="divide-y divide-gray-300 h-[350px] overflow-x-auto">
        {loading ? (
          <LoadingContainer color="green" bgColor="white" />
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-4 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <div className="flex items-center justify-center">
                {formatFullName(
                  transaction.resident.user.firstname,
                  transaction.resident.user.middlename,
                  transaction.resident.user.lastname,
                  false
                )}
              </div>
              <div className="flex items-center justify-center">
                {transaction.transaction_date}
              </div>
              <div className="flex items-center justify-center">
                {isNaN(transaction.amount)
                  ? "₱0.00"
                  : `₱${parseFloat(transaction.amount).toFixed(2)}`}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No transactions available</div>
        )}
      </div>

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
    </div>
  );
};

export default MonthlyDuesIncomeDetails;
