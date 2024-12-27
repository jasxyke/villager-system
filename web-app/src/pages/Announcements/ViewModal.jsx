import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import modalStyles from "./AnnouncementPage.module.css";
import styles from "./ViewAnnouncements.module.css";
import noImg from "../../assets/no_image.jpg";

const ViewModal = ({
  isViewing,
  onClose,
  announcement,
  editAnnouncement,
  changePic,
}) => {
  const [title, setTitle] = useState(announcement.title);
  const [startDate, setStartDate] = useState(announcement.event_start_date);
  const [endDate, setEndDate] = useState(announcement.event_end_date);
  const [startTime, setStartTime] = useState(announcement.event_start_time);
  const [endTime, setEndTime] = useState(announcement.event_end_time);
  const [content, setContent] = useState(announcement.content);
  const [img, setImg] = useState(announcement.picture_url);
  useEffect(() => {
    setTitle(announcement.title);
    setStartDate(announcement.event_start_date);
    setEndDate(announcement.event_end_date);
    setStartTime(announcement.event_start_time);
    setEndTime(announcement.event_end_time);
    setContent(announcement.content);
    setImg(announcement.picture_url);
  }, [announcement]);

  const openPicker = () => {
    const imgPicker = document.getElementById("announceImg");
    imgPicker.click();
  };
  const changePicture = (imageFile) => {
    changePic(
      announcement.id,
      imageFile,
      (imgURL) => setImg(imgURL),
      (msg) => {
        alert(msg);
        const imgPicker = document.getElementById("announceImg");
        imgPicker.value = null;
      }
    );
  };
  const handleEdit = () => {
    const formData = {
      title: title,
      content: content,
      eventStartDate: startDate,
      eventEndDate: endDate,
      eventStartTime: startTime,
      eventEndTime: endTime,
    };

    console.log(formData);

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
      <h2 className="text-white text-2xl font-bold mb-5">Announcement</h2>
      <div className={styles.modalInfo}>
        <div className={styles.modalImgContainer}>
          <img src={img === null ? noImg : img} alt="" />

          {img !== null ? (
            <h2
              onClick={openPicker}
              className="text-white font-bold text-center w-[80%] mt-2 underline cursor-pointer"
            >
              Change Picture
            </h2>
          ) : (
            <h2
              onClick={openPicker}
              className="text-white font-bold text-center w-[80%] mt-2 underline cursor-pointer"
            >
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
          <div className="flex gap-y-3 text-white text-lg">
            <div className="w-[40%]">
              <h4>Start Date:</h4>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="text-black p-2"
                value={startDate}
                onChange={(date) => setStartDate(date.target.value)}
              />
            </div>
            <div className="w-[40%]">
              <h4>End Date:</h4>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(date) => setEndDate(date.target.value)}
                className="p-2 text-black"
              />
            </div>
          </div>
          <div className="flex gap-y-3 text-white text-lg">
            <div className="w-[40%]">
              <h4>Start Time:</h4>
              <input
                type="time"
                name="startTime"
                id="startTime"
                value={startTime}
                onChange={(time) => setStartTime(time.target.value)}
                className="text-black p-2"
              />
            </div>
            <div className="w-[40%]">
              <h4>End Time:</h4>
              <input
                type="time"
                name="endTime"
                id="endTime"
                value={endTime}
                onChange={(time) => setEndTime(time.target.value)}
                className="text-black p-2"
              />
            </div>
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
          Save
        </button>
        <button
          onClick={onClose}
          className="w-[125px] py-1 bg-greyGreen rounded-md text-white"
        >
          Close
        </button>
      </div>
      <input
        type="file"
        name="image"
        id="announceImg"
        accept="image/png, image/gif, image/jpeg"
        className="opacity-0"
        onChange={(file) => {
          setImg(file.target.files[0]);
          changePicture(file.target.files[0]);
        }}
      />
    </ReactModal>
  );
};

export default ViewModal;
