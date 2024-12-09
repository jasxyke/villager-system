import React from "react";
import { FiUser, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useLatestBookings from "../../hooks/Dashboard/useLatestBookings";
import LoadingElement from "../../components/LoadingScreen/LoadingElement";
import { formatName } from "../../utils/DataFormatter";

const OngoingBookings = () => {
  const { bookings, loading, error, currentPage, lastPage, changePage } =
    useLatestBookings();
  const navigate = useNavigate();

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      changePage(currentPage + 1);
    }
  };

  const reviewBooking = (selectedBooking) => {
    navigate("/booking", { state: { selectedBooking } });
  };

  return (
    <div className="relative w-full sm:w-7/12 bg-gradient-to-r from-green to-green rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <div className="p-4 rounded-xl min-h-[50vh] max-h-[60vh] overflow-hidden border">
        <div className="bg-oliveGreen p-4 rounded-t-md text-white font-semibold text-lg">
          Pending BOOKINGS
        </div>
        <div className="bg-white rounded-b-md">
          {loading && (
            <div className="pt-5 pb-5">
              <LoadingElement color="green" hasMargin={true} />
            </div>
          )}
          {error && (
            <div className="p-4 text-center text-red-500">
              Error: {error.message}
            </div>
          )}
          {!loading && !error && bookings.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No pending bookings.
            </div>
          )}
          {!loading &&
            !error &&
            bookings.length > 0 &&
            bookings.map((booking) => (
              <div
                key={booking.id}
                onClick={() => reviewBooking(booking)}
                className="flex items-center gap-6 p-4 bg-white hover:bg-gray-200 cursor-pointer rounded-md shadow-md transition-transform duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center items-center w-16 h-16 rounded-full bg-primary shadow-md transition-transform duration-300 transform hover:rotate-12 hover:scale-110">
                  <FiUser className="text-3xl text-[#E9F5DB]" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="text-lg font-semibold text-gray-900">
                    {booking.full_name}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-500">
                      {formatName(booking.amenity.name)}
                    </div>
                    <div className="text-sm text-yellow-600 font-semibold">
                      {formatName(booking.booking_status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
        <button
          className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-110 ${
            currentPage > 1 ? "" : "invisible"
          }`}
          onClick={handlePreviousPage}
        >
          <FiChevronLeft className="text-2xl text-gray-700" />
        </button>

        <button
          className={`p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-110 ${
            currentPage < lastPage ? "" : "invisible"
          }`}
          onClick={handleNextPage}
        >
          <FiChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default OngoingBookings;
