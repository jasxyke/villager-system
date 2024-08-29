import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import homeIcon from "../assets/icons/Home_white.png";
import bookingIcon from "../assets/icons/Calendar.png";
import billsIcon from "../assets/icons/Book.png";
import filesIcon from "../assets/icons/File.png";
import usersIcon from "../assets/icons/Users.png";
import announcementsIcon from "../assets/icons/chat_bubble.png";
import logoutIcon from "../assets/icons/Logout.png";
import styles from "./SideBar.module.css";
import { useAuthContext } from "../contexts/AuthContext";
import HouseIcon from "../assets/icons/temporaryhouse.png";
import { CiMemoPad } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { FiFileText } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { FaCar } from "react-icons/fa6";

const SideBar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const handleSucces = () => {
    //
  };

  const handleError = (msg) => {
    console.log(msg);
  };
  const logoutUser = () => {
    logout(handleSucces, handleError);
    navigate("/");
  };
  return (
    <nav className={styles.sidebar}>
      <ul>
        {/* <li>
          <NavLink to="/homepage">
            <img src={homeIcon} alt="Home" /> Home
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/booking">
            <img src={bookingIcon} alt="Booking" /> Booking
          </NavLink>
        </li>
        <li>
          <NavLink to="/bills">
            <img src={billsIcon} alt="Bills" /> Collections
          </NavLink>
        </li>
        {/*<li>
          <NavLink to="/files/house-permit">
            <img src={filesIcon} alt="Files" /> Files
          </NavLink>
        </li>*/}
        <li>
          <NavLink to="/permits">
            <CiMemoPad className="text-4xl mr-2" /> Permits
          </NavLink>
        </li>
        <li>
          <NavLink to="/sticker">
            <FaCar className="text-3xl mr-2" /> Car Stickers
          </NavLink>
        </li>
        <li>
          <NavLink to="/houses">
            <img src={HouseIcon} alt="Houses" /> Houses
          </NavLink>
        </li>
        <li>
          <NavLink to="/users/residents">
            <img src={usersIcon} alt="Users" /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/announcements">
            <img src={announcementsIcon} alt="Announcements" /> Announcements
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports">
            <FiFileText className="text-3xl mr-2" /> Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/guidelines">
            <CiReceipt className="text-4xl mr-2" /> Rules & Regulations
          </NavLink>
        </li>
        <li className="bg-transparent">
          <p className="" onClick={logoutUser}>
            <img src={logoutIcon} alt="Logout" /> Logout
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
