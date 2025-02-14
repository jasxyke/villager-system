import React, { useState, useEffect } from "react";
import useAnnouncements from "../../hooks/Announcements/useAnnouncements";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import styles from "./ViewAnnouncements.module.css";
import noImg from "../../assets/no_image.jpg";
import ViewModal from "./ViewModal";
import { converTime } from "../../utils/DataFormatter";
import ReactPaginate from "react-paginate";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const ViewAnnouncements = () => {
  const [isViewing, setIsViewing] = useState(false);
  const [announcement, setAnnouncement] = useState(null);
  const [announcementsList, setAnnouncementsList] = useState([]);

  const { showAlert } = useAlert();
  const {
    announcements,
    loading,
    getAnnouncements,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useAnnouncements();

  useEffect(() => {
    getAnnouncements((msg) => showAlert(msg, false));
  }, []);

  useEffect(() => {
    if (announcements) {
      const list = announcements.map((item, index) => (
        <AnnouncementItem
          key={item.id}
          announcement={item}
          index={index}
          onView={handleView}
        />
      ));
      setAnnouncementsList(list);
    }
  }, [announcements]);

  const handleView = (item) => {
    setAnnouncement(item);
    setIsViewing(true);
  };

  const handleModalClose = () => {
    setIsViewing(false);
  };

  const handlePageClick = (event) => {
    getAnnouncements((msg) => showAlert(msg), event.selected + 1, false); // API page is 1-indexed
  };

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return (
    <>
      <div className={styles.listContainer}>
        {loading ? (
          <LoadingContainer loading={loading} />
        ) : announcementsList.length > 0 ? (
          <>{announcementsList}</>
        ) : (
          <div className="text-center p-4 bg-white">
            No announcements available
          </div>
        )}
      </div>

      {announcement && (
        <ViewModal
          isViewing={isViewing}
          onClose={handleModalClose}
          announcement={announcement}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel={"next >"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel={"< previous"}
          renderOnZeroPageCount={null}
          className={"pagination rounded-md"}
          disabledClassName="pagination-disabled"
          pageClassName="text-white"
          activeClassName="pagination-active"
          forcePage={currentPage - 1} // Sync with API
        />
      </div>
    </>
  );
};

const AnnouncementItem = ({ announcement, index, onView }) => {
  const bgColor = index % 2 === 0 ? " bg-green" : " bg-primary";
  return (
    <div key={announcement.id} className={styles.listItem + bgColor}>
      <div className={styles.itemImage}>
        <img
          src={
            announcement.picture_url === null ? noImg : announcement.picture_url
          }
          alt="Announcement"
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

export default ViewAnnouncements;
