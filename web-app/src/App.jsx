import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Home/HomePage";
import BookingPage from "./pages/Booking/BookingPage";
import BillsPage from "./pages/Bills/BillsPage";
import FilePage from "./pages/File/FilePage";
import AnnouncementPage from "./pages/Announcements/AnnouncementPage";
import Residents from "./pages/Users/Residents";
import AdminPage from "./pages/Users/AdminPage";
import Login from "./pages/Login/Login";
import Sidebar from "./components/SideBar";
import HousePermit from "./pages/File/HousePermit";
import BuildingPermit from "./pages/File/BuildingPermit";
import CarSticker from "./pages/File/CarSticker";
import { useAuthContext } from "./contexts/AuthContext";
import AuthenticatedMiddleRoute from "./components/MiddleRoutes/AuthenticatedMiddleRoute";
import LoginMiddleRoute from "./components/MiddleRoutes/LoginMiddleRoute";
import Houses from "./pages/Houses/Houses";
import Permits from "./pages/Permits/Permits";
import Reports from "./pages/Reports/Reports";
import CommunityRulesAndRegulation from "./pages/RulesAndRegulation/CommunityRulesAndRegulation";
import Sticker from "./pages/CarSticker/Sticker";
import Complaints from "./pages/Complaints/Complaints";

function App() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className={isLoggedIn() ? "app-container" : "w-full h-full"}>
      {isLoggedIn() ? <Sidebar /> : null}
      <div className="main">
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
            <Route path="/permits" element={<Permits />} />
            <Route path="/announcements" element={<AnnouncementPage />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/users">
              <Route path="residents" element={<Residents />} />

              <Route path="admins" element={<AdminPage />} />
            </Route>
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/guidelines"
              element={<CommunityRulesAndRegulation />}
            />
            <Route path="/sticker" element={<Sticker />} />
            <Route path="/complaints" element={<Complaints />} />
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
