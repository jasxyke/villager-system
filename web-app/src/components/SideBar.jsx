import React, { useEffect, useRef } from "react";
import { BiCar } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import {
  FiBook,
  FiCalendar,
  FiClipboard,
  FiFlag,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";
import { PiMoneyWavy } from "react-icons/pi";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "./SideBar.module.css";
import LoadingPage from "./LoadingScreen/LoadingPage";
import LoadingContainer from "./LoadingScreen/LoadingContainer";
import { RiLockPasswordLine } from "react-icons/ri";

const SideBar = () => {
  const { logout, user } = useAuthContext();
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
            to="/monthly-dues"
            ref={location.pathname === "/monthly-dues" ? activeLinkRef : null}
          >
            <FiBook className="text-3xl mr-2" /> Monthly Dues
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clearance"
            ref={location.pathname === "/clearance" ? activeLinkRef : null}
          >
            <FiClipboard className="text-3xl mr-2" />
            Clearance
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
        {["admin"].includes(user?.role_type) && (
          <li>
            <NavLink
              to="/announcements"
              ref={
                location.pathname === "/announcements" ? activeLinkRef : null
              }
            >
              <FiMessageSquare className="text-3xl mr-2" />
              Announcements
            </NavLink>
          </li>
        )}
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
            to="/expenses-income"
            ref={
              location.pathname === "/expenses-income" ? activeLinkRef : null
            }
          >
            <PiMoneyWavy className="text-3xl mr-2" />
            Expenses and Income
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
        {["admin"].includes(user?.role_type) && (
          <li>
            <NavLink
              to="/admin-settings"
              ref={
                location.pathname === "/admin-settings" ? activeLinkRef : null
              }
            >
              <MdOutlineRoomPreferences className="text-4xl mr-2" />
              Admin Settings
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/change-password"
            ref={
              location.pathname === "/change-password" ? activeLinkRef : null
            }
          >
            <RiLockPasswordLine className="text-3xl mr-2" />
            Change Password
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
