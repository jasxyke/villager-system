import React, { useState, useEffect } from "react";
import MainLogo from "../../components/MainLogo";
import { FiUser, FiUsers } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axios";
import LoadingPage from "../../components/LoadingScreen/LoadingPage";
import { TbCalendarCheck } from "react-icons/tb";
import useOverdueResidents from "../../hooks/useOverdueResidents";
import useTotalBookings from "../../hooks/useTotalBookings";
import useTotalResidents from "../../hooks/useTotalResidents";
import OngoingBookings from "./OngoingBookings";
import MostUnpaid from "./MostUnpaid";
import RecentApplications from "./RecentApplications";
import OverdueModal from "./OverdueModal";
import useOverdueResidentsList from "../../hooks/useOverdueResidentsList";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(""); // State for modal content

  const navigate = useNavigate(); // Initialize useNavigate

  const {
    totalResidents,
    loading: loadingResidents,
    error: errorResidents,
  } = useTotalResidents();

  const {
    totalBookings,
    loading: loadingBookings,
    error: errorBookings,
  } = useTotalBookings();

  const {
    overdueCount,
    loading: loadingOverdue,
    error: errorOverdue,
  } = useOverdueResidents();

  // Handle opening the modal with relevant content
  const handleUnpaidClick = () => {
    setModalContent(
      "Here you can manage all the unpaid residents. You may want to add additional info here."
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // New function for navigating to the bookings page
  const handleBookingsClick = () => {
    navigate("/booking"); // Redirect to the Bookings page
  };

  return (
    <div>
      <div className="pt-10">
        <MainLogo />
      </div>
      <div className="flex p-2">
        <div
          className="flex flex-row items-center bg-gradient-to-r from-green to-green p-8 w-full max-w-sm cursor-pointer mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onClick={() => navigate("/houses")} // Redirect to the Houses page
        >
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center bg-primary p-6 rounded-full shadow-md transform hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out">
            <FiHome className="text-5xl text-[#E9F5DB]" />
          </div>

          <div className="flex flex-col flex-grow items-start pl-8 space-y-2">
            <h2 className="text-6xl font-bold text-white tracking-tight">
              {totalResidents}
            </h2>
            <p className="text-sm text-mutedGreen uppercase font-semibold tracking-wider">
              Total Residents
            </p>
          </div>
        </div>

        <div
          className="flex flex-row items-center bg-gradient-to-r from-green to-green p-8 w-full max-w-sm cursor-pointer mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onClick={handleUnpaidClick} // Open the modal when clicked
        >
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center bg-primary p-6 rounded-full shadow-md transform hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out">
            <FiUsers className="text-5xl text-[#E9F5DB]" />
          </div>
          <div className="flex flex-col flex-grow items-start pl-8 space-y-2">
            <h2 className="text-6xl font-bold text-white tracking-tight">
              {overdueCount}
            </h2>
            <p className="text-sm text-mutedGreen uppercase font-semibold tracking-wider">
              UNPAID RESIDENTS
            </p>
          </div>
        </div>

        <div
          className="flex flex-row items-center bg-gradient-to-r from-green to-green p-8 w-full max-w-sm cursor-pointer mx-auto rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          onClick={handleBookingsClick} // Navigate to the bookings page when clicked
        >
          <div className="flex-shrink-0 w-1/3 flex items-center justify-center bg-primary p-6 rounded-full shadow-md transform hover:rotate-12 hover:scale-110 transition-all duration-300 ease-in-out">
            <TbCalendarCheck className="text-5xl text-[#E9F5DB]" />
          </div>
          <div className="flex flex-col flex-grow items-start pl-8 space-y-2">
            <h2 className="text-6xl font-bold text-white tracking-tight">
              {totalBookings}
            </h2>
            <p className="text-sm text-mutedGreen uppercase font-semibold tracking-wider">
              MONTHLY BOOKINGS
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-4">
        <OngoingBookings />
        <MostUnpaid />
      </div>

      <div className="p-5">
        <RecentApplications />
      </div>

      <OverdueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        overdueResidents={useOverdueResidentsList}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AdminDashboard;
