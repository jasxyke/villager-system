import React, { useState, useEffect } from "react";
import MainLogo from "../../components/MainLogo";
import { FiUser, FiUsers } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
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
import useIncomes from "../../hooks/IncomeExpenses/useIncomes";
import { SyncLoader } from "react-spinners";
import { FaMoneyBillWave } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(""); // State for modal content
  const [currentMonth, setCurrentMonth] = useState(""); // State for current month
  const [currentYear, setCurrentYear] = useState(""); // State for current year

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data using custom hooks
  // const {
  //   totalResidents,
  //   loading: loadingResidents,
  //   error: errorResidents,
  // } = useTotalResidents();

  // const {
  //   totalBookings,
  //   loading: loadingBookings,
  //   error: errorBookings,
  // } = useTotalBookings();

  // const {
  //   overdueCount,
  //   loading: loadingOverdue,
  //   error: errorOverdue,
  // } = useOverdueResidents();

  // Use the income hook
  const {
    incomes,
    loading: loadingIncome,
    error: errorIncome,
    fetchIncomes,
  } = useIncomes();

  // Get the current date and month for income display
  useEffect(() => {
    const now = new Date();
    setCurrentMonth(now.toLocaleString("default", { month: "long" })); // Full month name (e.g., January)
    setCurrentYear(now.getFullYear()); // Current year
    fetchIncomes(now.getFullYear(), now.getMonth() + 1); // Pass current year and month (0-based, so add 1)
  }, [fetchIncomes]);

  // Check if any data is still loading
  // const isLoading =
  //   loadingResidents || loadingBookings || loadingOverdue || loadingIncome;

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
    <div className="p-4">
      <div className="pt-10">
        <MainLogo />
      </div>
      <div className="p-6 mx-4 bg-green rounded-lg shadow-lg">
        {/* Title Section with Icon */}
        <div className="flex justify-between items-center text-white mb-2">
          <div className="flex items-center space-x-4">
            <FcMoneyTransfer className="text-6xl bg-gradient-to-r from-oliveGreen to-paleGreen text-white rounded-full p-4 shadow-md transform transition-transform duration-300 hover:scale-110" />
            <div className="text-3xl font-semibold tracking-tight">
              MONTHLY INCOME
            </div>
          </div>
          <div className="text-xl font-medium text-greyGreen">
            {currentMonth} {currentYear}
          </div>
        </div>

        {/* Income Display */}
        <div className="flex justify-between">
          <div className="text-6xl ml-5 font-extrabold text-greyGreen leading-tight">
            {loadingIncome ? (
              <div className="">
                <SyncLoader size={20} color="#AEC09A" loading={loadingIncome} />
                <span className="text-[#AEC09A] text-lg" />
              </div>
            ) : errorIncome ? (
              <span className="text-red-400 font-medium">{`Error: ${errorIncome.message}`}</span>
            ) : (
              `$${incomes?.total_income ? incomes.total_income.toFixed(2) : 0}`
            )}
          </div>
          {/* Action Button */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => navigate("/expenses-income")}
              className="bg-gradient-to-r from-secondary to-oliveGreen text-white py-3 px-8 rounded-full shadow-md hover:bg-gradient-to-r hover:from-oliveGreen hover:to-secondary transition-all duration-300 transform hover:scale-105 ease-in-out"
            >
              GENERATE REPORT
            </button>
          </div>
        </div>
      </div>

      {/* PARANG UNNECESARY KASI NA INFORMATION ITO, DI KO SURE KUNG KEEP OR NOT */}

      {/* <div className="flex p-2">
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
              UNPAID MONTHLY DUES
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
      </div> */}

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
