import React, { useState } from "react";
import ReactModal from "react-modal";
import modalStyles from "./AnnouncementPage.module.css";
import styles from "./ViewAnnouncements.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewModal = ({ isViewing, onClose, announcement, editAnnouncement }) => {
  console.log(announcement.event_date_time);

  const [title, setTitle] = useState(announcement.title);
  const [dateTime, setDateTime] = useState(
    new Date(announcement.event_date_time)
  );
  const [content, setContent] = useState(announcement.content);

  const handleEdit = () => {
    var dateTimeForm =
      dateTime.getFullYear() +
      "-" +
      ("0" + (dateTime.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + dateTime.getDate()).slice(-2) +
      " " +
      ("0" + dateTime.getHours()).slice(-2) +
      ":" +
      ("0" + dateTime.getMinutes()).slice(-2);

    console.log(dateTimeForm);

    const formData = {
      title: title,
      content: content,
      eventDateTime: dateTimeForm,
    };

    editAnnouncement(
      announcement.id,
      formData,
      (msg) => {
        alert(msg);
      },
      (msg) => {
        alert(msg);
      }
    );
  };
  return (
    <ReactModal
      isOpen={isViewing}
      onRequestClose={onClose}
      className={modalStyles.modal}
      overlayClassName={modalStyles.overlay}
      id="modalView"
      ariaHideApp={false}
    >
      <h2 className="text-white text-2xl font-bold mb-10">Announcement</h2>
      <div className={styles.modalInfo}>
        <div className={styles.modalImgContainer}>
          <img src={announcement.picture_url} alt="" />

          {announcement.picture_url !== null ? (
            <h2 className="text-white font-bold text-center w-[80%] mt-2 underline cursor-pointer">
              Change Picture
            </h2>
          ) : (
            <h2 className="text-white font-bold text-center w-[80%] mt-2 underline cursor-pointer">
              Add Picture
            </h2>
          )}
        </div>
        <div className={styles.informations}>
          <div className="text-white text-lg">
            <h4>Announcement Title: </h4>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-white text-black rounded-md p-2 w-full"
              value={title}
              onChange={(obj) => setTitle(obj.target.value)}
            />
          </div>
          <div className="text-white text-lg w-full">
            <h4>Announcement date:</h4>
            <DatePicker
              selected={dateTime}
              onChange={(date) => setDateTime(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              timeIntervals={15}
              className="text-black w-full p-2"
            />
          </div>
          <div className="text-white text-lg">
            <h3>Announcement Content:</h3>
            <textarea
              rows={5}
              className="bg-white text-black rounded-md p-2 w-full"
              value={content}
              onChange={(obj) => setContent(obj.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleEdit}
          className="w-[125px] py-1 mr-5 bg-secondary rounded-md text-white"
        >
          Edit
        </button>
        <button
          onClick={onClose}
          className="w-[125px] py-1 bg-greyGreen rounded-md text-white"
        >
          Close
        </button>
      </div>
    </ReactModal>
  );
};

export default ViewModal;
