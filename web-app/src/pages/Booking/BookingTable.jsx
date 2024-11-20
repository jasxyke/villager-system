import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useBookings from "../../hooks/Bookings/useBookings";
import BookingReviewModal from "./BookingReviewModal";
import ReactPaginate from "react-paginate";
import Styles from "./BookingPage.module.css";
import LoadingContainer from "../../components/LoadingScreen/LoadingContainer";
import { formatName } from "../../utils/DataFormatter";

const BookingTable = ({ selectedAmenity }) => {
  const { state } = useLocation();
  const { selectedBooking: initialBooking } = state || {};
  const {
    bookings,
    loading,
    error,
    fetchBookings,
    currentPage,
    setPage,
    lastPage,
  } = useBookings(selectedAmenity);

  const [selectedBooking, setSelectedBooking] = useState(initialBooking);
  const [isModalOpen, setIsModalOpen] = useState(!!initialBooking);

  useEffect(() => {
    if (selectedAmenity) {
      fetchBookings(selectedAmenity, 1);
    }
  }, [selectedAmenity]);

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setPage(page);
    fetchBookings(selectedAmenity, page);
  };

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    fetchBookings(selectedAmenity, 1);
    setIsModalOpen(false);
  };

  return (
    <div className="text-white mt-4">
      <div className="grid grid-cols-7 bg-oliveGreen font-semibold rounded-t-lg">
        <div className="px-4 py-3 text-center">FULLNAME</div>
        <div className="px-4 py-3 text-center">EMAIL</div>
        <div className="px-4 py-3 text-center">BOOKING DATE</div>
        <div className="px-4 py-3 text-center">BOOKING TIME</div>
        <div className="px-4 py-3 text-center">PAYMENT STATUS</div>
        <div className="px-4 py-3 text-center">STATUS</div>
        <div className="px-4 py-3 text-center">ACTION</div>
      </div>

      <div className="divide-y divide-gray-300 h-[300px] overflow-y-auto bg-white min-h-[300px]">
        {loading ? (
          <LoadingContainer color="green" bgColor="white" />
        ) : bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={index}
              className={`grid grid-cols-7 gap-4 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 text-black`}
            >
              <div className="px-4 py-3 text-center truncate">
                {booking.full_name}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {booking.email}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {booking.booking_date}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {`${booking.start_time} - ${booking.end_time}`}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {formatName(booking.payment_status)}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {formatName(booking.booking_status)}
              </div>
              <div className="px-4 py-3 text-center">
                <button
                  className="p-2 bg-oliveGreen rounded-md text-white"
                  onClick={() => handleReviewClick(booking)}
                >
                  REVIEW
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No bookings available.</div>
        )}
      </div>
      {lastPage > 0 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={lastPage}
            className={`${Styles.pagination} rounded-md`}
            activeClassName="active bg-paleGreen px-2"
          />
        </div>
      )}
      {selectedBooking && (
        <BookingReviewModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
          amenity={selectedBooking.amenity}
          onUpdate={handleSave}
        />
      )}
    </div>
  );
};

export default BookingTable;
