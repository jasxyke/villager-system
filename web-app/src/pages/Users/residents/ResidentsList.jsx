import React, { useEffect, useState } from "react";
import styles from "../Users.module.css";
import { formatFullName } from "../../../utils/DataFormatter";

const ResidentsList = ({ residents, handleViewDetails, selectedResident }) => {
  return (
    <>
      {residents.map((resident, index) => (
        // MODIFIED: Added onClick to handle viewing resident details
        <div
          key={index}
          // className={`${styles.residentRow} ${
          //   selectedResident === residents[index] ? styles.selected : ""
          // }`}
          className={styles.residentRow}
          onClick={() => handleViewDetails(resident)}
        >
          <div className={styles.residentItem}>
            {formatFullName(
              resident.firstname,
              resident.middlename,
              resident.lastname,
              true
            )}
          </div>
          <div className={styles.residentItem}>
            {resident?.resident?.house?.block || "N/A"}
          </div>
          <div className={styles.residentItem}>
            {resident?.resident?.house?.lot || "N/A"}
          </div>
          <div className={styles.residentItem}>{resident.email || "N/A"}</div>
          <div className={styles.residentItem}>
            {resident.role_type || "N/A"}
          </div>
        </div>
      ))}
    </>
  );
};

export default ResidentsList;
