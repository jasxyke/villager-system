import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiFile } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import useAnnouncements from "../../hooks/useAnnouncements";

const AddNotification = () => {
  const getPeople = () => ["Everyone", "Residents"];
  const getType = () => ["Monthly BIlls", "Garbage Collection", "Meetings"];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const { addAnnouncement, loading } = useAnnouncements();

  const handleSucces = (msg) => {
    alert(msg);
    clearFields();
  };

  const handleError = (msg) => {
    alert(msg);
  };

  const clearFields = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);
    // setType(AnnouncementTypes[0].value);
    setTitle("");
    setContent("");
    setImg(null);
  };
  const submit = () => {
    const formData = {
      title: title,
      content: content,
      // type: type,
      announcementPic: img,
      eventStartDate: startDate,
      eventEndDate: endDate,
      eventStartTime: startTime,
      eventEndTime: endTime,
    };

    console.log(`start date: ${startDate}`);
    console.log(`start time: ${startTime}`);

    addAnnouncement(formData, handleSucces, handleError);
  };

  const setFile = (event) => {
    setImg(event.target.files[0]);
  };

  return (
    <div className="p-10 pt-5">
      <h2 className="text-white text-2xl mb-4 p-2 border-b-2 flex justify-between">
        Create Notification
        <button className="text-red-600 hover:text-red-800">
          <FaTrash />
        </button>
      </h2>

      <div className="flex justify-between mt-10">
        <div className="flex items-center">
          <FiUser size={50} className="p-3 rounded-l-lg bg-mutedGreen" />
          <select className="w-44 p-2 text-2xl rounded-r-lg bg-mutedGreen border-l-4 border-green">
            <option value="">People</option>
            {getPeople().map((person, index) => (
              <option key={index} value={index + 1}>
                {person}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <FiFile size={50} className="p-4 rounded-l-lg bg-mutedGreen" />
          <select className="w-80 p-2 text-2xl rounded-r-lg bg-mutedGreen border-l-4 border-green">
            <option value="">Type</option>
            {getType().map((type, index) => (
              <option key={index} value={index + 1}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-3 mt-8">
        <label htmlFor="title" className="block text-white mb-2">
          Announcement Title/Caption
        </label>
        <input
          value={title}
          onChange={(title) => setTitle(title.target.value)}
          type="text"
          name="title"
          id="title"
          className="bg-greyGreen rounded-md w-[75%] p-2 text-black"
        />
      </div>

      {/* Message Text Area */}
      <div className="bg-greyGreen h-[250px] mt-4 rounded-md p-4">
        <h2 className="font-bold">MESSAGE</h2>
        <textarea
          type="text"
          name="content"
          id="content"
          className="w-full mt-2 rounded-md p-2"
          rows={7}
          value={content}
          onChange={(obj) => setContent(obj.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-greyGreen py-2 px-8 mt-5 ml-auto rounded-md"
          onClick={submit}
        >
          Announce
        </button>
      </div>
    </div>
  );
};

export default AddNotification;
