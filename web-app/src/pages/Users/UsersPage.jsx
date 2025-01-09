import React from "react";
import mainLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import MainLogo from "../../components/MainLogo";
import { useAuthContext } from "../../contexts/AuthContext";

const UsersPage = ({ children }) => {
  const { user } = useAuthContext();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.userContainer}>
        <MainLogo />
        <div className={styles.userHeaderButtons}>
          <Link to="/users/residents" className={styles.userButton}>
            Residents
          </Link>
          {user.role_type === "admin" && (
            <Link to="/users/admins" className={styles.userButton}>
              Administrators
            </Link>
          )}
        </div>
        {children}
      </div>
      <div />
    </div>
  );
};

export default UsersPage;
