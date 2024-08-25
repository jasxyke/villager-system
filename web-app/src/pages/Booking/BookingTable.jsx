import React, { useEffect, useState } from "react";
import useBookings from "../../hooks/useBookings";
import ReactPaginate from "react-paginate";
import BookingReviewModal from "./BookingReviewModal";
import Styles from "./BookingPage.module.css";

const BookingTable = ({ selectedAmenity }) => {
  const {
    bookings,
    loading,
    error,
    fetchBookings,
    currentPage,
    setPage,
    lastPage,
    updateBooking,
    addPayment,
  } = useBookings(selectedAmenity);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedAmenity) {
      fetchBookings(selectedAmenity, 1); // Fetch bookings when amenity changes
    }
  }, [selectedAmenity]);

  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setPage(page);
    fetchBookings(selectedAmenity, page); // Fetch bookings for the selected page
  };

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    fetchBookings(selectedAmenity, 1);
    setIsModalOpen(false);
  };

  const bookingData = bookings || [];
  const totalPages = lastPage || 0;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-white mt-4">
      <div className="grid grid-cols-7 bg-green font-semibold">
        <div className="px-4 py-3 text-center">FULLNAME</div>
        <div className="px-4 py-3 text-center">EMAIL</div>
        <div className="px-4 py-3 text-center">CONTACT NO.</div>
        <div className="px-4 py-3 text-center">BOOKING DATE</div>
        <div className="px-4 py-3 text-center">BOOKING TIME</div>
        <div className="px-4 py-3 text-center">STATUS</div>
        <div className="px-4 py-3 text-center">ACTION</div>
      </div>
      <div className="space-y-2 mt-2 bg-green">
        {bookingData.length > 0 ? (
          bookingData.map((booking, index) => (
            <div
              key={index}
              className={`grid grid-cols-7 items-center ${
                index % 2 === 0 ? "bg-darkOliverGreen" : "bg-green"
              }`}
            >
              <div className="px-4 py-3 text-center truncate">
                {booking.full_name}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {booking.email}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {booking.contact_number}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {booking.booking_date}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {`${booking.start_time} - ${booking.end_time}`}
              </div>
              <div className="px-4 py-3 text-center truncate">
                {booking.booking_status}
              </div>
              <div className="px-4 py-3 text-center">
                <button
                  className="p-2 bg-secondary rounded-md"
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
      {totalPages > 0 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel={"next >"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel={"< previous"}
            renderOnZeroPageCount={null}
            className={Styles.pagination + " rounded-md"}
            disabledClassName="text-grey opacity-50"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active bg-paleGreen px-2"
          />
        </div>
      )}
      {selectedBooking && (
        <BookingReviewModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          booking={selectedBooking}
          amenity={
            selectedBooking.amenity /* You might want to pass amenities here */
          }
          onUpdate={handleSave}
        />
      )}{" "}
    </div>
  );
};

export default BookingTable;
