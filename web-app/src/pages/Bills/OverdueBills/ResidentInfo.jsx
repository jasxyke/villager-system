import React from "react";
import {
  FiArrowLeft,
  FiPhone,
  FiMail,
  FiFacebook,
  FiUser,
  FiHome,
  FiBriefcase,
  FiNavigation,
  FiMapPin,
} from "react-icons/fi";
import { BiMaleSign } from "react-icons/bi";
import PaymentHistory from "./PaymentHistory";

const ResidentInfo = ({ bill }) => {
  return (
    <div className="mt-4 p-2">
      {/* Profile Info - Name and Picture side by side */}
      <div className="flex items-center justify-center space-x-4">
        {/* Profile Pic */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://i.pravatar.cc/150?img=2" // Example: Random person image URL from pravatar.cc
            alt="Sample Resident Name"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Resident Name and Role */}
        <div className="text-start">
          <div className="text-sm font-semibold text-black truncate">
            JOHN REY REBUSQUILLO
          </div>
          <div className="text-sm">Homeowner</div>
        </div>
      </div>

      <hr className="mt-4 mb-4" />

      {/* Contact Info Card */}
      <div className="">
        <div className="text-md font-bold text-black mb-2">
          Contact Information:
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-black">
            <FiMail />
            <span>Email:</span>
          </div>
          <div className="text-black"></div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiPhone />
            <span>Contact Number:</span>
          </div>
          <div className="text-black"></div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiFacebook />
            <span>Facebook URL:</span>
          </div>
          <div className="text-black"></div>
        </div>
      </div>

      <hr className="mt-4 mb-4" />

      {/* Resident Details Section */}
      <div className="">
        <div className="text-md font-bold text-gray-800 mb-2">
          Resident Details:
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-black">
            <FiHome />
            <span>Block No:</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiMapPin />
            <span>Lot No:</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiUser />
            <span>Age:</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <BiMaleSign />
            <span>Gender:</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiBriefcase />
            <span>Occupation:</span>
            <div className="text-black"></div>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />

      {/* Resident Details Section */}
      <div className="">
        <div className="text-md font-bold text-gray-800 mb-2">
          Payment History:
        </div>
        <PaymentHistory />

        <button className="p-2 text-red-500">View all</button>
      </div>
    </div>
  );
};

export default ResidentInfo;
