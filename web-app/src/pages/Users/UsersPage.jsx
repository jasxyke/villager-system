import React from "react";
import mainLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";

const UsersPage = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.userContainer}>
        <div className={styles.logoMiddle}>
          <img src={mainLogo} alt="Main Logo" className={styles.logoClass} />
        </div>
        <div className={styles.userHeaderButtons}>
          <Link to="/users/residents" className={styles.userButton}>
            Residents
          </Link>
          <Link to="/users/guests" className={styles.userButton}>
            Guests
          </Link>
          <Link to="/users/admins" className={styles.userButton}>
            Administrators
          </Link>
        </div>
        {children}
      </div>
      <div />
    </div>
  );
};

export default UsersPage;
