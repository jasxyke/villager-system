import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./AnnouncementPage.module.css";
import mainLogo from "../../assets/logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainLogo from "../../components/MainLogo";
import AddAnnouncement from "./AddAnnouncement";
import ViewAnnouncements from "./ViewAnnouncements";
import NotifyResidents from "./NotifyResidents";
import { colors } from "../../utils/colors";
import AddNotification from "./AddNotification";

const AnnouncementPage = () => {
  const [isAdding, setIsAdding] = useState(true);
  const [isViewing, setIsViewing] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);
  const [isAddingNotification, setIsAddingNotification] = useState(false); // New state for AddNotification

  const reset = () => {
    setIsAdding(false);
    setIsViewing(false);
    setIsNotifying(false);
    setIsAddingNotification(false); // Reset new state
  };
  const adding = () => {
    reset();
    setIsAdding(true);
  };

  const viewing = () => {
    reset();
    setIsViewing(true);
  };

  const notifying = () => {
    reset();
    setIsNotifying(true);
  };

  const addingNotification = () => {
    reset();
    setIsAddingNotification(true); // New function to handle AddNotification
  };

  return (
    <div className={styles.mainContainer + " "}>
      <div className="w-full mt-10 ">
        <MainLogo />
        <div className="text-right w-[90%] mx-auto">
          <input
            className={styles.announcementButton + " text-center"}
            value={"ADD ANNOUNCEMENT"}
            onClick={adding}
            type="button"
            style={{ backgroundColor: isAdding && colors.primary }}
          />
          <input
            className={styles.announcementButton + " text-center"}
            value={"VIEW ANNOUNCEMENTS"}
            onClick={viewing}
            type="button"
            style={{ backgroundColor: isViewing && colors.primary }}
          />
          <input
            className={styles.announcementButton + " text-center"}
            value={"NOTIFY RESIDENTS"}
            onClick={notifying}
            type="button"
            style={{ backgroundColor: isNotifying && colors.primary }}
          />
          <input
            className={styles.announcementButton + " text-center"}
            value={"ADD NOTIFICATION"} // New button for AddNotification
            onClick={addingNotification}
            type="button"
            style={{ backgroundColor: isAddingNotification && colors.primary }}
          />
        </div>
      </div>
      <div className="flex-1 items-center justify-center mb-10">
        <div className={styles.optionsContainer}>
          {/*{isAdding ? (
            <AddAnnouncement />
          ) : isViewing ? (
            <ViewAnnouncements />
          ) : (
            isNotifying && <NotifyResidents />
          )}*/}
          {isAdding ? (
            <AddAnnouncement />
          ) : isViewing ? (
            <ViewAnnouncements />
          ) : isNotifying ? (
            <NotifyResidents />
          ) : isAddingNotification ? (
            <AddNotification /> // New component displayed here
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;
