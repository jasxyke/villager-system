import React, { useState } from "react";
import styles from "./BookingPage.module.css";
import MainLogo from "../../components/MainLogo";
import SearchBar from "./SearchBar";
import BookingTable from "./BookingTable";
import EditAmenitiesModal from "./EditAmenitiesModal";
import { AMENNITIES } from "../../data/contants";

const BookingPage = () => {
  const [selectedAmenityId, setSelectedAmenityId] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const selectedAmenity =
    AMENNITIES.find((amenity) => amenity.id === selectedAmenityId)?.name || "";

  const handleAmenitySelection = (id) => {
    setSelectedAmenityId(id);
    console.log(id);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.mainContainer + " h-full"}>
      <div className={styles.bookingContainer}>
        <div className={styles.logoMiddle}>
          <MainLogo />
        </div>
        <div className={styles.bookingButtons}>
          {AMENNITIES.map((amenity) => (
            <button
              key={amenity.id}
              className={
                (selectedAmenityId === amenity.id
                  ? "bg-secondary"
                  : "bg-green") +
                "  text-white p-4 rounded-lg outline-none border-paleGreen"
              }
              onClick={() => handleAmenitySelection(amenity.id)}
            >
              {amenity.name}
            </button>
          ))}
        </div>
        <EditAmenitiesModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
        />
        <div className={styles.searchBarContainer + " flex justify-between"}>
          {/* <SearchBar /> */}
          <div></div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-green rounded-md text-white p-2"
          >
            Edit Amenities
          </button>
        </div>
        <div className={styles.searchBarContainer}>
          <BookingTable selectedAmenity={selectedAmenityId} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
