import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
import BillsPage from "./pages/Bills/BillsPage";
import FilePage from "./pages/File/FilePage";
import AnnouncementPage from "./pages/Announcements/AnnouncementPage";
import Residents from "./pages/Users/Residents";
import GuestPage from "./pages/Users/GuestPage";
import AdminPage from "./pages/Users/AdminPage";
import Login from "./pages/Login/Login";
import Sidebar from "./components/SideBar";
import HousePermit from "./pages/File/HousePermit";
import BuildingPermit from "./pages/File/BuildingPermit";
import CarSticker from "./pages/File/CarSticker";
import { useAuthContext } from "./contexts/AuthContext";
import axiosClient, { DOMAIN } from "./utils/axios";
import AuthenticatedMiddleRoute from "./components/MiddleRoutes/AuthenticatedMiddleRoute";
import LoginMiddleRoute from "./components/MiddleRoutes/LoginMiddleRoute";
import Houses from "./pages/Houses/Houses";

function App() {
  const { loggedIn, isLoggedIn } = useAuthContext();

  useEffect(() => {
    axiosClient
      .get("/sanctum/csrf-cookie", { baseURL: DOMAIN })
      .then((res) => {});
  }, []);
  return (
    <div className={isLoggedIn() ? "app-container" : "w-full h-full"}>
      {isLoggedIn() ? <Sidebar /> : null}
      <div className="w-full">
        <Routes>
          <Route element={<AuthenticatedMiddleRoute />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/files">
              <Route path="house-permit" element={<HousePermit />} />
              <Route path="Building-permit" element={<BuildingPermit />} />
              <Route path="sticker" element={<CarSticker />} />
            </Route>
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/users">
              <Route path="residents" element={<Residents />} />
              <Route path="guests" element={<GuestPage />} />
              <Route path="admins" element={<AdminPage />} />
            </Route>
          </Route>
          <Route element={<LoginMiddleRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
