import React, { useEffect, useState } from "react";
import Table from "./Table";
import PermitDetails from "../PermitDetails";
import Review from "./Review";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import SelectOptions from "../../../components/forms/SelectOptions";
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import ReactPaginate from "react-paginate";

const options = [
  { value: "pending", text: "Pending" },
  { value: "rejected", text: "Rejected" },
];

const PermitApplications = () => {
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [detailsView, setDetailsView] = useState(false);
  const [status, setStatus] = useState("pending");
  const {
    permitRequests,
    loading,
    error,
    currentPage,
    lastPage,
    fetchPermitRequests,
    changePage,
  } = usePermitRequests();

  useEffect(() => {
    fetchPermitRequests(status, currentPage); // Fetch permits by status and page
  }, [status, currentPage]);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleReviewClick = (permit, e) => {
    e.stopPropagation();
    setSelectedPermit(permit);
    setDetailsView(false);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
    fetchPermitRequests(status, currentPage);
  };

  const handlePageClick = (event) => {
    changePage(status, event.selected + 1);
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="mt-2">
        {detailsView ? (
          <PermitDetails permit={selectedPermit} onBack={handleBack} />
        ) : selectedPermit ? (
          <Review permit={selectedPermit} onBack={handleBack} />
        ) : (
          <div>
            {loading ? (
              <LoadingContainer />
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <>
                <Table
                  onRowClick={handleRowClick}
                  onReviewClick={handleReviewClick}
                  permitRequests={permitRequests}
                  loading={loading}
                />
                <SelectOptions
                  list={options}
                  onChangeValue={setStatus}
                  value={status}
                  label="Status"
                  width="auto"
                />
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
                      className="pagination rounded-md"
                      disabledClassName="text-grey opacity-50"
                      pageClassName="text-white"
                      activeClassName="bg-paleGreen px-2"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitApplications;
