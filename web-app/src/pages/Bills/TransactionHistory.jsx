import React, { useEffect } from "react";
import useTransactions from "../../hooks/useTransactions";
import { formatFullName, formatName } from "../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";

const TransactionHistory = ({
  month,
  year,
  searchQuery,
  searchPressed,
  setSearchPressed,
}) => {
  const {
    transactions,
    loading,
    error,
    currentPage,
    lastPage,
    fetchTransactions,
    changePage,
  } = useTransactions();

  useEffect(() => {
    fetchTransactions(month, year, searchQuery, 1); // Fetch the first page by default
  }, [month, year]);

  useEffect(() => {
    if (searchPressed === true) {
      console.log(`search query: ${searchQuery}`);
      fetchTransactions(month, year, searchQuery, currentPage);
      setSearchPressed(false);
    }
    if (searchQuery === "") {
      fetchTransactions(month, year, searchQuery, currentPage);
    }
  }, [searchPressed, searchQuery]);

  const handlePageClick = (event) => {
    changePage(month, year, searchQuery, event.selected + 1);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="grid grid-cols-5 gap-4 bg-oliveGreen text-white font-semibold py-2 px-4 rounded-t">
        <div className="flex items-center justify-center">Homeowner</div>
        <div className="flex items-center justify-center">Due Date</div>
        <div className="flex items-center justify-center">Transaction Date</div>
        <div className="flex items-center justify-center">Paid Amount</div>
        <div className="flex items-center justify-center">Bill Status</div>
      </div>
      <div className="divide-y divide-gray-300 h-[350px] overflow-x-auto">
        {loading ? (
          <LoadingContainer color="green" bgColor="white" />
        ) : transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 gap-4 p-4 ${
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
                {transaction.bill.due_date}
              </div>
              <div className="flex items-center justify-center">
                {transaction.transaction_date}
              </div>
              <div className="flex items-center justify-center">
                {transaction.amount}
              </div>
              <div className="flex items-center justify-center">
                {formatName(transaction.bill.status)}
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

export default TransactionHistory;
