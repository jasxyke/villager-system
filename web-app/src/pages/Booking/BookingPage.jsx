import React, { useState, useEffect } from "react";
import styles from "./BookingPage.module.css";
import MainLogo from "../../components/MainLogo";
import SearchBar from "./SearchBar";
import BookingTable from "./BookingTable";
import EditAmenitiesModal from "./EditAmenitiesModal";
import LoadingPage from "../../components/LoadingScreen/LoadingPage";
import { useAmenities } from "../../contexts/AmenitiesContext";

const BookingPage = () => {
  const [selectedAmenityId, setSelectedAmenityId] = useState(1);

  // Use the custom hook to fetch amenities
  const { amenities, loading, error } = useAmenities();

  // Fetch amenities on mount
  // useEffect(() => {
  //   fetchAmenities();
  // }, []);

  // Handle error or loading states
  if (loading) {
    return <LoadingPage color="green" loading={loading} size={100} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle selection of amenities
  const selectedAmenity =
    amenities.find((amenity) => amenity.id === selectedAmenityId)?.name || "";

  const handleAmenitySelection = (id) => {
    setSelectedAmenityId(id);
    console.log(id);
  };

  return (
    <div className={styles.mainContainer + " h-full"}>
      <div className={styles.bookingContainer}>
        <MainLogo />
        <div className={styles.bookingButtons}>
          {/* Map over fetched amenities instead of the constant AMENNITIES */}
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              className={
                (selectedAmenityId === amenity.id
                  ? "bg-secondary"
                  : "bg-green") +
                " text-white p-4 rounded-lg outline-none border-paleGreen"
              }
              onClick={() => handleAmenitySelection(amenity.id)}
            >
              {amenity.name}
            </button>
          ))}
        </div>
        <div className={styles.searchBarContainer}>
          <BookingTable selectedAmenity={selectedAmenityId} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
