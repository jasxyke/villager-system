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

const AnnouncementPage = () => {
  const [isAdding, setIsAdding] = useState(true);
  const [isViewing, setIsViewing] = useState(false);
  const [isNotifying, setIsNotifying] = useState(false);

  const reset = () => {
    setIsAdding(false);
    setIsViewing(false);
    setIsNotifying(false);
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
        </div>
      </div>
      <div className="flex-1 items-center justify-center mb-10">
        <div className={styles.optionsContainer}>
          {isAdding ? (
            <AddAnnouncement />
          ) : isViewing ? (
            <ViewAnnouncements />
          ) : (
            isNotifying && <NotifyResidents />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;
