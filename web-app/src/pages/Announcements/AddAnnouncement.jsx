import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnnouncementTypes } from "../../data/contants";
import useAnnouncements from "../../hooks/useAnnouncements";

const AddAnnouncement = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [type, setType] = useState(AnnouncementTypes[0].value);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);

  const { addAnnouncement, loading } = useAnnouncements();

  const handleSucces = (msg) => {
    alert(msg);
    clearFields();
  };

  const handleError = (msg) => {
    alert(msg);
  };

  const clearFields = () => {
    setDate(new Date());
    setTime(new Date());
    setType(AnnouncementTypes[0].value);
    setTitle("");
    setContent("");
    setImg(null);
  };
  const submit = () => {
    var dateTime =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + time.getHours()).slice(-2) +
      ":" +
      ("0" + time.getMinutes()).slice(-2);

    console.log(dateTime);

    const formData = {
      title: title,
      content: content,
      eventDateTime: dateTime,
      type: type,
      announcementPic: img,
    };

    addAnnouncement(formData, handleSucces, handleError);
  };

  const setFile = (event) => {
    setImg(event.target.files[0]);
  };

  const typesOptions = AnnouncementTypes.map((type) => (
    <option key={type.value} value={type.value}>
      {type.text}
    </option>
  ));
  return (
    <div className="p-10">
      <div className="flex gap-x-4 mb-5">
        <DatePicker
          showIcon
          selected={date}
          onChange={(date) => setDate(date)}
          className="rounded-md bg-greyGreen"
        />
        <DatePicker
          showIcon
          selected={time}
          onChange={(time) => setTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="time"
          dateFormat={"h:mm aa"}
          className="rounded-md bg-greyGreen"
        />
        <select
          className="w-[225px] bg-greyGreen rounded-md"
          onChange={(value) => setType(value)}
          value={type}
        >
          {typesOptions}
        </select>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/gif, image/jpeg"
          onChange={setFile}
          className="bg-greyGreen my-auto p-1 rounded-md"
        />
      </div>
      <div className="">
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
      <div className="bg-greyGreen h-[250px] mt-4 rounded-md p-5">
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
