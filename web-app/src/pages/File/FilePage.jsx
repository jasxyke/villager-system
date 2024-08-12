import React from 'react';
import Container from '../../components/Container/Container';
import mainLogo from "../../assets/logo.png";
import styles from './Files.module.css';
import { Link } from 'react-router-dom';


const FilePage = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.filesContainer}>
        <div className={styles.logoMiddle}>
          <img src={mainLogo} alt="Main Logo" className={styles.logoClass} />
        </div>
        <div className={styles.fileHeaderButtons}>
          <Link to="/files/house-permit" className={styles.fileButton}>
            House Permit
          </Link>
          <Link to="/files/building-permit" className={styles.fileButton}>
            Building Permit
          </Link>
          <Link to="/files/sticker" className={styles.fileButton}>
            Car Sticker
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FilePage;
