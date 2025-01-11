import React, { useState } from "react";
import mainLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import MainLogo from "../../components/MainLogo";
import { useAuthContext } from "../../contexts/AuthContext";

const UsersPage = ({ children }) => {
  const { user } = useAuthContext();

  // State to track the active button
  const [activeButton, setActiveButton] = useState("");

  // Handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.userContainer}>
        <MainLogo />
        <div className={styles.userHeaderButtons}>
          <Link
            to="/users/residents"
            className={`${styles.userButton} ${
              activeButton === "residents" ? styles.activeButton : ""
            }`}
            onClick={() => handleButtonClick("residents")}
          >
            Residents
          </Link>
          {user.role_type === "admin" && (
            <Link
              to="/users/admins"
              className={`${styles.userButton} ${
                activeButton === "admins" ? styles.activeButton : ""
              }`}
              onClick={() => handleButtonClick("admins")}
            >
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
