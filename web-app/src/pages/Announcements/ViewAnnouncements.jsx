import React, { useState } from "react";
import useAnnouncements from "../../hooks/useAnnouncements";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import styles from "./ViewAnnouncements.module.css";
import noImg from "../../assets/default_img.jpg";
import ViewModal from "./ViewModal";

const AnnouncementItem = ({ announcement, index, onView }) => {
  console.log(`announcement: ${announcement}`);
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
          {new Date(announcement.event_date_time).toDateString()}
        </div>
        {/* <div className="text-white mb-1">
          {new Date(announcement.event_date_time).toUTCString()}
        </div> */}
      </div>
      <div className={styles.itemBtn + " flex justify-center items-center"}>
        <button
          onClick={() => onView(announcement)}
          className="w-[125px] py-1 bg-greyGreen rounded-md text-white"
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
  const { announcements, loading, editAnnouncement } = useAnnouncements();

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
    <AnnouncementItem announcement={item} index={index} onView={handleView} />
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
        />
      )}
    </>
  );
};

export default ViewAnnouncements;
