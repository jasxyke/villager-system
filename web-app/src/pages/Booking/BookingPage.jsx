import React from "react";
import styles from "./BookingPage.module.css";
import Calendar from "./Calendar";
import MainLogo from "../../components/MainLogo";
import SearchBar from "./SearchBar";
import BookingTable from "./BookingTable";

const BookingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.bookingContainer}>
        <div className={styles.logoMiddle}>
          <MainLogo />
          {/*<img src="/Logo-D.svg" alt="logo" className={styles.logoClass} />*/}
        </div>
        {/** REMOVE THISS SHEEEYY */}
        {/*<div className={styles.notificationSection}>
        <div>
          <div className={styles.notificationTitle}>PENDING BOOKING APPROVAL</div>
          <div className={styles.notificationList}>
            {
              [...Array(5)].map((_, i) => (
                <div key={i} className={styles.notificationCard}>
                  <div className={styles.notificationText}>Christian Dior : Basketball Court, 9:00 AM - 12:00 PM, June 29, 2023</div>
                  <div className={styles.notificationButtons}>
                    <svg className={styles.notificationIcon} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M40 12L18 34L8 24" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg className={styles.notificationIcon} viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M36 12L12 36M12 12L36 36" stroke="#EC221F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>*/}
        <div className={styles.bookingButtons}>
          <button className={styles.active}>MULTI-PURPOSE HALL</button>
          <button className={styles.active}>BASKETBALL COURT</button>
        </div>
        <div>
          <Calendar />
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.searchBarContainer}>
          <BookingTable />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
