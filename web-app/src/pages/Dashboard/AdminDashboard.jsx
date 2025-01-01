import React, { useState } from "react";
import MainLogo from "../../components/MainLogo";
import { FiUser, FiUsers } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer"; // Import LoadingContainer
import useOverdueResidents from "../../hooks/Dashboard/useOverdueResidents";
import useTotalBookings from "../../hooks/Dashboard/useTotalBookings";
import useTotalResidents from "../../hooks/Dashboard/useTotalResidents";
import OngoingBookings from "./OngoingBookings";
import MostUnpaid from "./MostUnpaid";
import RecentApplications from "./RecentApplications";
import OverdueModal from "./OverdueModal";
import useOverdueResidentsList from "../../hooks/Dashboard/useOverdueResidentsList";
import { TbCalendarCheck } from "react-icons/tb";
import LoadingElement from "../../components/LoadingScreen/LoadingElement";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(""); // State for modal content

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data using custom hooks
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

  // Check if any data is still loading
  const isLoading = loadingResidents || loadingBookings || loadingOverdue;

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
    <div className="pb-10">
      <div className="pt-10">
        <MainLogo />
      </div>
      <div className="p-4 mr-4 ml-4 bg-green rounded-lg">
        <div className="flex justify-between text-white">
          <div>TOTAL INCOME</div>
          <div>DATE</div>
        </div>
        <div className="flex">
          <div>
            <div>//put here the total amount using the useincomes</div>
            <div>//under is the expenses</div>
          </div>

          <div>REPORT</div>
        </div>
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
              {loadingResidents ? <LoadingElement /> : totalResidents}
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
              {loadingOverdue ? <LoadingElement /> : overdueCount}
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
              {loadingBookings ? <LoadingElement /> : totalBookings}
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

      {/* <div className="p-5">
        <RecentApplications />
      </div> */}

      <OverdueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        overdueResidents={useOverdueResidentsList}
      />
    </div>
  );
};

export default AdminDashboard;
