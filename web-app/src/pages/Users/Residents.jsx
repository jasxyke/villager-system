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
  const { residents, getAllResidents, loading, editResident, changePage } =
    useResidents();
  const [selectedResident, setSelectedResident] = useState(null);
  const handleSuccess = () => {
    //
  };

  const handleError = (msg) => {
    console.log(msg);
  };

  const goToPage = (event) => {
    console.log(event.selected + 1);
    changePage(event.selected + 1);
  };

  useEffect(() => {
    getAllResidents(handleSuccess, handleError);
  }, []);

  // ADDED: Function to handle viewing resident details
  const handleViewDetails = (resident) => {
    setSelectedResident(resident);
  };

  if (residents === null) {
    return <LoadingPage color={"white"} loading={loading} />;
  }

  return (
    <UsersPage>
      <div className={styles.residentContainer}>
        {/* mag add ako ng funtion dito para ma select yung mga residents */}
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
              {loading ? (
                <LoadingContainer />
              ) : residents !== null ? (
                <ResidentsList
                  residents={residents.data}
                  handleViewDetails={handleViewDetails}
                />
              ) : null}
              {/* <button className={styles.addDataButton} onClick={handleAddClick}>
                ➕ Add Data
              </button> */}
            </div>
          </>
        ) : (
          <ResidentDetails
            resident={selectedResident}
            onBack={() => setSelectedResident(null)}
            editResident={editResident}
            updateResident={setSelectedResident}
          />
        )}
      </div>
      <div className="flex justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel={"next>"}
          onPageChange={goToPage}
          pageRangeDisplayed={5}
          pageCount={residents.last_page}
          previousLabel={"<previous"}
          renderOnZeroPageCount={null}
          className={paginationStyles.pagination + " rounded-md"}
          disabledClassName="text-grey opacity-50"
          pageClassName="text-white"
          activeClassName="bg-paleGreen px-2"
        />
      </div>
    </UsersPage>
  );
};

export default Residents;
