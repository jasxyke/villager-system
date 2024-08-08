import React from 'react';
import { Link } from 'react-router-dom'; 
import homeIcon from '../assets/icons/Home_white.png';
import bookingIcon from '../assets/icons/Calendar.png';
import billsIcon from '../assets/icons/Book.png';
import filesIcon from '../assets/icons/File.png';
import usersIcon from '../assets/icons/Users.png';
import announcementsIcon from '../assets/icons/chat_bubble.png';
import logoutIcon from '../assets/icons/Logout.png';
import styles from './SideBar.module.css';

const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link to="/homepage">
            <img src={homeIcon} alt="Home" /> Home
          </Link>
        </li>
        <li>
          <Link to="/booking">
            <img src={bookingIcon} alt="Booking" /> Booking
          </Link>
        </li>
        <li>
          <Link to="/bills">
            <img src={billsIcon} alt="Bills" /> Bills
          </Link>
        </li>
        <li>
          <Link to="/files/house-permit">
            <img src={filesIcon} alt="Files" /> Files
          </Link>
        </li>
        <li>
          <Link to="/users/residents">
            <img src={usersIcon} alt="Users" /> Users
          </Link>
        </li>
        <li>
          <Link to="/announcements">
            <img src={announcementsIcon} alt="Announcements" /> Announcements
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <img src={logoutIcon} alt="Logout" /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
