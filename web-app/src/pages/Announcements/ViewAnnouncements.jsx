import React, { useEffect, useState } from "react";
import useAnnouncements from "../../hooks/useAnnouncements";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import styles from "./ViewAnnouncements.module.css";
import noImg from "../../assets/no_image.jpg";
import ViewModal from "./ViewModal";
import { converTime } from "../../utils/DataFormatter";

const AnnouncementItem = ({ announcement, index, onView }) => {
  const bgColor = index % 2 === 0 ? " bg-green" : " bg-primary";
  return (
    <div key={announcement.id} className={styles.listItem + bgColor}>
      <div className={styles.itemImage}>
        <img
          src={
            announcement.picture_url === null ? noImg : announcement.picture_url
          }
        />
      </div>
      <div className={styles.itemDesc}>
        <div className="text-white text-2xl mb-2">{announcement.title}</div>
        <div className="text-white mb-1">
          {new Date(announcement.event_start_date).toDateString()} -{" "}
          {new Date(announcement.event_end_date).toDateString()}
        </div>
        <div className="text-white mb-1">
          {converTime(announcement.event_start_time)} -{" "}
          {converTime(announcement.event_end_time)}
        </div>
      </div>
      <div className={styles.itemBtn + " flex justify-center items-center"}>
        <button
          onClick={() => onView(announcement)}
          className="w-[125px] p-2 bg-greyGreen rounded-md text-white"
        >
          VIEW
        </button>
      </div>
    </div>
  );
};

const ViewAnnouncements = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const {
    announcements,
    loading,
    editAnnouncement,
    getAnnouncements,
    changePicture,
  } = useAnnouncements();

  useEffect(() => {
    getAnnouncements((msg) => alert(msg));
  }, []);

  if (announcements === null) {
    return <LoadingContainer loading={loading} />;
  }

  const handleView = (item) => {
    setAnnouncement(item);
    setIsViewing(true);
  };

  const handleModalClose = () => {
    setIsViewing(false);
  };

  const list = announcements.map((item, index) => (
    <AnnouncementItem
      key={item.id}
      announcement={item}
      index={index}
      onView={handleView}
    />
  ));
  return (
    <>
      <div className={styles.listContainer}>{list}</div>
      {announcement !== null && (
        <ViewModal
          isViewing={isViewing}
          onClose={handleModalClose}
          announcement={announcement}
          editAnnouncement={editAnnouncement}
          changePic={changePicture}
        />
      )}
    </>
  );
};

export default ViewAnnouncements;
