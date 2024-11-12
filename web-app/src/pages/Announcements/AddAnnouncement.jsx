import React, { useState } from "react";
import { AnnouncementTypes } from "../../data/contants";
import useAnnouncements from "../../hooks/Announcements/useAnnouncements";

const AddAnnouncement = () => {
  // const [type, setType] = useState(AnnouncementTypes[0].value);
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

  // const typesOptions = AnnouncementTypes.map((type) => (
  //   <option key={type.value} value={type.value}>
  //     {type.text}
  //   </option>
  // ));
  return (
    <div className="p-10 pt-5">
      <h2 className="text-white text-2xl mb-4 p-2 border-b-2">
        Create announcement
      </h2>
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-white">
            Start date:
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="text-black p-2 bg-greyGreen"
            value={startDate}
            onChange={(date) => setStartDate(date.target.value)}
          />
        </div>

        {/* <h2 className="text-white text-2xl my-auto h-full bg-red-800">-</h2> */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-white">
            End date:
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(date) => setEndDate(date.target.value)}
            className="text-black p-2 bg-greyGreen"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-white">
            Start time:
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={startTime}
            onChange={(time) => setStartTime(time.target.value)}
            className="text-black p-2 bg-greyGreen"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-white">
            End time:
          </label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            value={endTime}
            onChange={(time) => setEndTime(time.target.value)}
            className="text-black p-2 bg-greyGreen"
          />
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="types" className="text-white">
            Announcement type:{" "}
          </label>
          <select
            id="types"
            name="types"
            className="w-[225px] bg-greyGreen rounded-md p-2"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            {typesOptions}
          </select>
        </div> */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-white">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/gif, image/jpeg"
            onChange={setFile}
            className="bg-greyGreen my-auto p-1 rounded-md"
          />
        </div>
      </div>
      <div className="mb-3">
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

export default AddAnnouncement;
