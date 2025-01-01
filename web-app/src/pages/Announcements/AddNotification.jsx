import React, { useState } from "react";
import { FiUser, FiFile } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";

const AddNotification = () => {
  const [selectedPeople, setSelectedPeople] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [peopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const handlePeopleChange = (value) => {
    setSelectedPeople(value);
    setPeopleDropdownOpen(false);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setTypeDropdownOpen(false);
  };

  const handleSend = () => {
    // Logic to handle sending the notification goes here.
    alert("Notification Sent!");
  };

  return (
    <div className="relative p-10 pt-5 rounded-xl">
      {/* Header Section */}
      <h2 className="text-white text-2xl mb-8 p-2 border-b-2">
        Create Notifications
      </h2>
      <div className="flex gap-6 mb-8">
        {/* People Dropdown */}
        <div className="relative flex-1">
          <button
            className="flex items-center w-full h-14 rounded-xl gap-3 pl-4 pr-2 bg-mutedGreen text-black hover:bg-darkerGreen transition"
            onClick={() => setPeopleDropdownOpen(!peopleDropdownOpen)}
          >
            <FiUser size={24} color="black" />
            <span className="w-[2px] h-full bg-green" />
            <span className="text-lg font-medium hover:text-green-500 transition-colors">
              {selectedPeople || "Select People"}
            </span>
            <FaCaretDown size={16} />
          </button>
          {peopleDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-t-lg"
                onClick={() => handlePeopleChange("everyone")}
              >
                Everyone
              </div>
              <div
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handlePeopleChange("residents")}
              >
                Residents
              </div>
            </div>
          )}
        </div>

        {/* Type Dropdown */}
        <div className="relative flex-1">
          <button
            className="flex items-center w-full h-14 rounded-xl gap-3 pl-4 pr-2 bg-mutedGreen text-black hover:bg-darkerGreen transition"
            onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
          >
            <FiFile size={24} color="black" />
            <span className="w-[2px] h-full bg-green" />
            <span className="text-lg font-medium hover:text-green-500 transition-colors">
              {selectedType || "Select Type"}
            </span>
            <FaCaretDown size={16} />
          </button>
          {typeDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-t-lg"
                onClick={() => handleTypeChange("emergency")}
              >
                Emergency
              </div>
              <div
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleTypeChange("garbage-collection")}
              >
                Garbage Collection
              </div>
              <div
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-b-lg"
                onClick={() => handleTypeChange("meeting")}
              >
                Meeting
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-white mb-2"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full bg-mutedGreen px-4 py-3 h-14 border text-black rounded-lg shadow-sm focus:ring-2 focus:ring-green transition"
        />
      </div>

      {/* Notification Text Area */}
      <div className="mb-6">
        <label
          htmlFor="notification"
          className="block text-sm font-semibold text-white mb-2"
        >
          Notification
        </label>
        <textarea
          id="notification"
          className="w-full bg-mutedGreen px-4 py-3 border text-black rounded-lg shadow-sm focus:ring-2 focus:ring-green transition"
          rows="6"
        />
      </div>

      {/* Send Button */}
      <div class="flex justify-end">
        <button
          onClick={handleSend}
          className="p-2 bg-mutedGreen text-black font-semibold text-lg rounded-lg hover:bg-darkerGreen transition duration-200 ease-in-out focus:outline-none"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default AddNotification;
