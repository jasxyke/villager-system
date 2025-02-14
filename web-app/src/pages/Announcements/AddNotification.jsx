import React, { useState, useEffect } from "react";
import { FiUser, FiFile } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { formatName } from "../../utils/DataFormatter";
import useNotifications from "../../hooks/Announcements/useNotifications";
import { useSettings } from "../../contexts/SettingsContext";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const AddNotification = () => {
  const [selectedPeople, setSelectedPeople] = useState("Everyone");
  const [selectedType, setSelectedType] = useState("");
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("");
  const [peopleDropdownOpen, setPeopleDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const { showAlert } = useAlert();

  const { settings } = useSettings();

  const { loading, sendNotificationToAll } = useNotifications();

  // Set default title and notification based on type
  useEffect(() => {
    if (selectedType === "garbage-collection") {
      setTitle("Garbage Collection Reminder");
      setNotification(
        `The truck has arrived in the village. Please take out your trash in the designated area only. Thank you!\n\nRegards, ${settings.village_name} HOA`
      );
    } else if (selectedType === "emergency") {
      setTitle("Emergency Alert");
      setNotification(
        `An emergency has occured. Wait for further announcements regarding the emergency. Please stay safe and be alert all the times.\n\nRegards, ${settings.village_name} HOA`
      );
    }
  }, [selectedType]);

  const handlePeopleChange = (value) => {
    setSelectedPeople(value);
    setPeopleDropdownOpen(false);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setTypeDropdownOpen(false);
  };

  const handleSend = () => {
    const notificationForm = { title, body: notification };

    sendNotificationToAll(
      notificationForm,
      (successMessage) => {
        showAlert(successMessage, false);
        setTitle("");
        setNotification("");
        setSelectedType("");
      },
      (errorMessage) => {
        showAlert(errorMessage, false);
      }
    );
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
              {selectedPeople || "People"}
            </span>
            <FaCaretDown size={16} />
          </button>
          {peopleDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div
                className="p-3 cursor-pointer hover:bg-gray-100 rounded-t-lg"
                onClick={() => handlePeopleChange("Everyone")}
              >
                Everyone
              </div>
              <div
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handlePeopleChange("Select Residents")}
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
              {formatName(selectedType) || "Select Type"}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg w-full bg-mutedGreen px-4 py-3 h-14 border text-black rounded-lg shadow-sm focus:ring-2 focus:ring-green transition"
        />
      </div>

      {/* Notification Text Area */}
      <div className="mb-6">
        <label
          htmlFor="notification"
          className="block text-sm font-semibold text-white mb-2"
        >
          Message
        </label>
        <textarea
          id="notification"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          className="text-lg w-full bg-mutedGreen px-4 py-3 border text-black rounded-lg shadow-sm focus:ring-2 focus:ring-green transition"
          rows="6"
        />
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          disabled={loading}
          className={`p-2 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-mutedGreen"
          } text-black font-semibold text-lg rounded-lg hover:bg-darkerGreen transition duration-200 ease-in-out focus:outline-none`}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
};

export default AddNotification;
