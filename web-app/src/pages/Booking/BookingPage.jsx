import React, { useState } from "react";
import styles from "./BookingPage.module.css";
import Calendar from "./Calendar";
import MainLogo from "../../components/MainLogo";
import SearchBar from "./SearchBar";
import BookingTable from "./BookingTable";
import { AMENNITIES } from "../../data/contants";

const BookingPage = () => {
  // Initialize with the ID of the default amenity
  const [selectedAmenityId, setSelectedAmenityId] = useState(1);

  // Get the name of the selected amenity based on the ID
  const selectedAmenity =
    AMENNITIES.find((amenity) => amenity.id === selectedAmenityId)?.name || "";

  // Function to handle amenity selection
  const handleAmenitySelection = (id) => {
    setSelectedAmenityId(id);
    console.log(id);
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
                "  text-white p-4 outline-none border-paleGreen"
              }
              onClick={() => handleAmenitySelection(amenity.id)}
            >
              {amenity.name}
            </button>
          ))}
        </div>
        {/* <div>
          <Calendar selectedAmenity={selectedAmenity} />
        </div> */}
        <div className={styles.searchBarContainer}>
          <SearchBar />
        </div>
        <div className={styles.searchBarContainer}>
          <BookingTable selectedAmenity={selectedAmenityId} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
