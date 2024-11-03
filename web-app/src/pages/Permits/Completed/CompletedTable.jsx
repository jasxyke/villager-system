import React, { useState, useEffect } from "react";
import PermitDetails from "../PermitDetails";
import usePermitRequests from "../../../hooks/Permits/usePermitRequests";
import LoadingContainer from "../../../components/LoadingScreen/LoadingContainer";
import ReactPaginate from "react-paginate"; // Add pagination support
import { formatName } from "../../../utils/DataFormatter";

const CompletedTable = () => {
  const [detailsView, setDetailsView] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const { permitRequests, loading, error, currentPage, lastPage, changePage } =
    usePermitRequests(); // Use the custom hook

  useEffect(() => {
    changePage("claimed", currentPage); // Fetch completed permits
  }, [currentPage]);

  const handleRowClick = (permit) => {
    setSelectedPermit(permit);
    setDetailsView(true);
  };

  const handleBack = () => {
    setSelectedPermit(null);
    setDetailsView(false);
  };

  const handlePageClick = (event) => {
    changePage("claimed", event.selected + 1); // Handle pagination
  };

  return (
    <div className="overflow-x-auto">
      {detailsView ? (
        <PermitDetails permit={selectedPermit} onBack={handleBack} />
      ) : (
        <>
          <div className="w-full mb-2">
            <div className="flex items-center justify-center font-medium bg-mutedGreen p-2 text-center">
              <div className="flex-1 p-2">Name</div>
              <div className="flex-1 p-2">Completed Date</div>
              <div className="flex-1 p-2">Claimed Date</div>
              <div className="flex-1 p-2">Type</div>
              <div className="flex-1 p-2">Status</div>
            </div>
          </div>

          <div>
            {loading ? (
              <LoadingContainer />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : permitRequests.length === 0 ? (
              <div className="text-center p-4 w-full">
                No completed permits found.
              </div>
            ) : (
              permitRequests.map((permit) => (
                <div
                  key={permit.id}
                  className="flex border mb-2 hover:bg-darkerGreen cursor-pointer text-white"
                  onClick={() => handleRowClick(permit)}
                >
                  <div className="flex-1 p-2 text-center">
                    {permit.resident.user.firstname}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {permit.completed_date || "N/A"}
                  </div>
                  <div className="flex-1 p-2 text-center">
                    {permit.claimed_date || "N/A"}
                  </div>
                  <div className="flex-1 p-2 text-center">{permit.purpose}</div>
                  <div className="flex-1 p-2 text-center">
                    {formatName(permit.permit_status)}
                  </div>
                </div>
              ))
            )}
          </div>

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
                className={"pagination rounded-md"}
                disabledClassName="text-grey opacity-50"
                pageClassName="text-white"
                activeClassName="bg-paleGreen px-2"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompletedTable;
