import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Home/HomePage';
import BookingPage from './pages/Booking/BookingPage';
import BillsPage from './pages/Bills/BillsPage';
import FilePage from './pages/File/FilePage';
import AnnouncementPage from './pages/Announcements/AnnouncementPage';
import Residents from './pages/Users/Residents';
import GuestPage from './pages/Users/GuestPage';
import AdminPage from './pages/Users/AdminPage';
import Login from './pages/Login/Login';
import Sidebar from './components/SideBar';
import HousePermit from './pages/File/HousePermit';
import BuildingPermit from './pages/File/BuildingPermit';
import CarSticker from './pages/File/CarSticker';
import Logout from './pages/Logout/Logout';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (success) => {
    console.log('Login status:', success);
    setIsLoggedIn(success);
  };

  return (
    <div className="w-100">
      {isLoggedIn && <Sidebar />}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Navigate to="/homepage" replace />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/bills" element={<BillsPage />} />
                <Route path="/files">
                  <Route path="house-permit" element={<HousePermit />} />
                  <Route path="Building-permit" element={<BuildingPermit />} />
                  <Route path="sticker" element={<CarSticker />} />
                </Route>
                <Route path="/announcements" element={<AnnouncementPage />} />
                <Route path="/users">
                  <Route path="residents" element={<Residents />} />
                  <Route path="guests" element={<GuestPage />} />
                  <Route path="admins" element={<AdminPage />} />
                </Route>
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate to="/homepage" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
  );
}

export default App;
