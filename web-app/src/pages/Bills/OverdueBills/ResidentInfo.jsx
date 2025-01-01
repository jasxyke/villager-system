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
import {
  calculateAge,
  formatName,
  formatUserName,
} from "../../../utils/DataFormatter";

const ResidentInfo = ({ resident }) => {
  return (
    <div className="mt-4 p-2">
      {/* Profile Info - Name and Picture side by side */}
      <div className="flex items-center justify-center space-x-4">
        {/* Profile Pic */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden shadow-lg">
          <img
            src={resident.user.picture_url} // Example: Random person image URL from pravatar.cc
            alt={resident.user.firstname}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Resident Name and Role */}
        <div className="text-start">
          <div className="text-sm font-semibold text-black truncate">
            {formatUserName(resident.user, false)}
          </div>
          <div className="text-sm">{formatName(resident.user.role_type)}</div>
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
            <span>Email: {resident.user.email}</span>
          </div>
          <div className="text-black"></div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiPhone />
            <span>Contact Number: {resident.user.contact_number}</span>
          </div>
          <div className="text-black"></div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiFacebook />
            <span>Facebook Name/URL: {resident.fb_name}</span>
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
            <span>Block No: {resident.house.block}</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiMapPin />
            <span>Lot No: {resident.house.lot}</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiUser />
            <span>Age: {calculateAge(resident.birthdate)}</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <BiMaleSign />
            <span>Sex: {formatName(resident.sex)}</span>
            <div className="text-black"></div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-black">
            <FiBriefcase />
            <span>Occupation: {formatName(resident.occupation_status)}</span>
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
        <PaymentHistory transactions={resident.transactions} />

        <button className="p-2 text-red-500">View all</button>
      </div>
    </div>
  );
};

export default ResidentInfo;
