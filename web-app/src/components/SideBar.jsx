import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
import { FaCar } from "react-icons/fa6";
import { BiCar, BiDetail } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  FiBook,
  FiCalendar,
  FiClipboard,
  FiFileText,
  FiFlag,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { TfiHome } from "react-icons/tfi";
import { CiGrid41 } from "react-icons/ci";

const SideBar = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const activeLinkRef = useRef(null); // Reference to the active link

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

  // Scroll the sidebar to the active NavLink on mount or location change
  useEffect(() => {
    if (activeLinkRef.current) {
      activeLinkRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [location.pathname]); // Trigger the effect when the route changes

  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            ref={location.pathname === "/dashboard" ? activeLinkRef : null}
          >
            <CiGrid41 className="text-3xl mr-2" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/booking"
            ref={location.pathname === "/booking" ? activeLinkRef : null}
          >
            <FiCalendar className="text-3xl mr-2" /> Booking
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bills"
            ref={location.pathname === "/bills" ? activeLinkRef : null}
          >
            <FiBook className="text-3xl mr-2" /> Bills
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/permits"
            ref={location.pathname === "/permits" ? activeLinkRef : null}
          >
            <FiClipboard className="text-3xl mr-2" />
            Permits
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sticker"
            ref={location.pathname === "/sticker" ? activeLinkRef : null}
          >
            <BiCar className="text-3xl mr-2" />
            Car Stickers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/houses"
            ref={location.pathname === "/houses" ? activeLinkRef : null}
          >
            <FiHome className="text-3xl mr-2" />
            Houses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users/residents"
            ref={
              location.pathname === "/users/residents" ? activeLinkRef : null
            }
          >
            <FiUsers className="text-3xl mr-2" />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/announcements"
            ref={location.pathname === "/announcements" ? activeLinkRef : null}
          >
            <FiMessageSquare className="text-3xl mr-2" />
            Announcements
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/complaints"
            ref={location.pathname === "/complaints" ? activeLinkRef : null}
          >
            <FiFlag className="text-3xl mr-2" /> Complaints
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            ref={location.pathname === "/reports" ? activeLinkRef : null}
          >
            <BsGraphUpArrow className="text-3xl mr-2" />
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-settings"
            ref={location.pathname === "/admin-settings" ? activeLinkRef : null}
          >
            <MdOutlineRoomPreferences className="text-4xl mr-2" />
            Admin Settings
          </NavLink>
        </li>
        <li className="bg-transparent">
          <p className="" onClick={logoutUser}>
            <FiLogOut className="text-3xl mr-2" /> Logout
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
