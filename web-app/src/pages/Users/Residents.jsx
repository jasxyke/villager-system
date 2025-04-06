import React, { useEffect, useState } from "react";
import UsersPage from "./UsersPage";
import styles from "./Users.module.css";
import ResidentDetails from "./residents/ResidentDetails";
import useResidents from "../../hooks/useResidents";
import LoadingPage from "../../components/LoadingScreen/LoadingPage";
import { formatFullName } from "../../utils/DataFormatter";
import ResidentsList from "./residents/ResidentsList";
import ReactPaginate from "react-paginate";
import paginationStyles from "./residents/Residents.module.css";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";

const Residents = () => {
  const { residents, fetchResidents, loading, error, currentPage, lastPage } =
    useResidents();
  const [selectedResident, setSelectedResident] = useState(null);

  const handleSuccess = () => {
    fetchResidents(currentPage); // Re-fetch residents after a successful action
  };

  const handleError = (msg) => {
    console.log(msg);
  };

  const goToPage = (event) => {
    fetchResidents(event.selected + 1); // Change the page when user selects another page
  };

  useEffect(() => {
    fetchResidents(currentPage); // Fetch residents when component mounts or page changes
  }, [currentPage]);

  // ADDED: Function to handle viewing resident details
  const handleViewDetails = (resident) => {
    setSelectedResident(resident);
  };

  if (loading) {
    return <LoadingPage color={"white"} loading={loading} />;
  }

  return (
    <UsersPage>
      <div className={styles.residentContainer}>
        {selectedResident === null ? (
          <>
            <div className={styles.residentHeader}>
              <div className={styles.residentHeaderItem}>Full Name</div>
              <div className={styles.residentHeaderItem}>Block No</div>
              <div className={styles.residentHeaderItem}>Lot No</div>
              <div className={styles.residentHeaderItem}>Email</div>
              <div className={styles.residentHeaderItem}>Type</div>
            </div>
            <div className={styles.residentBody}>
              {residents.length > 0 ? (
                <ResidentsList
                  residents={residents}
                  handleViewDetails={handleViewDetails}
                />
              ) : (
                <div>No residents found</div>
              )}
            </div>
          </>
        ) : (
          <ResidentDetails
            resident={selectedResident}
            onBack={() => setSelectedResident(null)}
            updateResident={setSelectedResident}
          />
        )}
      </div>
      {lastPage > 1 && (
        <div className="flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel={"next>"}
            onPageChange={goToPage}
            pageRangeDisplayed={5}
            pageCount={lastPage}
            previousLabel={"<previous"}
            className={paginationStyles.pagination + " rounded-md"}
            disabledClassName="text-grey opacity-50"
            pageClassName="text-white"
            activeClassName="bg-paleGreen px-2"
          />
        </div>
      )}
    </UsersPage>
  );
};

export default Residents;
