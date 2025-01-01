import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import ResidentInfo from "./OverdueBills/ResidentInfo";
import OverdueDetails from "./OverdueBills/OverdueDetails";
import OverdueMonthlyList from "./OverdueBills/OverdueMonthlyList";
import OverduePaymentModal from "./OverdueBills/OverduePaymentModal";
import useSendNotification from "../../hooks/useSendNotification";

const OverdueViewDetails = ({ resident, onBack, onSucess }) => {
  const { sendNotificationToUser, loading, error, success } =
    useSendNotification();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if the modal is open

  const handleMakePaymentClick = () => {
    setIsModalOpen(true); // Open the modal when Make Payment button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSuccess = () => {
    onBack();
    onSucess();
  };

  const handleRemindClick = () => {
    // Call sendNotificationToUser with the resident's user ID, title, and body
    const title = "Reminder: Overdue Monthly Dues";
    const body = `Hello ${resident.resident.user.firstname}!,\n\nYou have overdue monthly dues. Please make a payment at your earliest convenience.`;
    sendNotificationToUser(resident.resident.user.id, title, body);
  };

  return (
    <div className="bg-gradient-to-b from-green to-paleDarkGreen rounded-lg p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-12">
        <button
          className="text-black text-lg p-2 bg-white rounded-full shadow-xl hover:bg-gray-100 transition transform hover:scale-110"
          onClick={onBack}
        >
          <FiArrowLeft />
        </button>
        <h2 className="text-4xl font-bold text-white text-center flex-1">
          Overdue Bill Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8 max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4">
        {/* Resident Details */}
        <ResidentInfo resident={resident.resident} />

        {/* Overdue Details */}
        <div className="p-6 border-l-2">
          <div className="flex justify-between items-center mb-6 mt-2">
            <div className="text-lg font-bold text-black tracking-wide">
              Overdue Summary
            </div>
            <button
              className="relative flex items-center space-x-2 text-red-500 text-base font-medium group p-1"
              onClick={handleRemindClick} // Trigger the remind function
            >
              <BiBell className="text-2xl transition-transform group-hover:rotate-12" />
              <span>Remind</span>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500"></div>
            </button>
          </div>

          <hr className="" />

          <OverdueDetails residentBill={resident} />

          <OverdueMonthlyList unpaidDues={resident.resident.bills} />

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            <button
              className="bg-gradient-to-r from-darkOliverGreen to-paleDarkGreen text-white text-lg font-semibold py-3 rounded-lg shadow hover:from-primary hover:to-green transition transform hover:scale-105 text-center cursor-pointer"
              onClick={handleMakePaymentClick} // Open the modal when clicked
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && (
        <OverduePaymentModal
          onClose={handleCloseModal}
          overdues={resident.resident.bills}
          onSucess={handleSuccess}
        />
      )}

      {/* Display success or error message */}
      {/* {loading && <p>Sending reminder...</p>}
      {success && <p className="text-green-500">Reminder sent successfully!</p>} */}
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </div>
  );
};

export default OverdueViewDetails;
