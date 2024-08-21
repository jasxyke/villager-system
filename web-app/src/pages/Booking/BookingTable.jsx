import React, { useState } from "react";
import SampleBookings from "./SampleBookings";

const BookingTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(SampleBookings.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = SampleBookings.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="text-white mt-4">
      <div className="grid grid-cols-7 bg-green font-semibold">
        <div className="px-4 py-3 text-center">FULLNAME</div>
        <div className="px-4 py-3 text-center">EMAIL</div>
        <div className="px-4 py-3 text-center">CONTACT NO.</div>
        <div className="px-4 py-3 text-center">BOOKING DATE</div>
        <div className="px-4 py-3 text-center">BOOKING TIME</div>
        <div className="px-4 py-3 text-center">STATUS</div>
        <div className="px-4 py-3 text-center">ACTIONS</div>
      </div>

      <div className="space-y-2 mt-2">
        {currentItems.map((booking, index) => (
          <div
            key={index}
            className={`grid grid-cols-7 items-center ${
              index % 2 === 0 ? "bg-darkOliverGreen" : "bg-green"
            }`}
          >
            <div className="px-4 py-3 text-center truncate">
              {booking.fullname}
            </div>
            <div className="px-4 py-3 text-center truncate">
              {booking.email}
            </div>
            <div className="px-4 py-3 text-center truncate">
              {booking.contactNo}
            </div>
            <div className="px-4 py-3 text-center truncate">
              {booking.bookingDate}
            </div>
            <div className="px-4 py-3 text-center truncate">
              {booking.bookingTime}
            </div>
            <div className="px-4 py-3 text-center truncate">
              {booking.status}
            </div>
            <div className="px-4 py-3 text-center">
              <button className="bg-yellow-500 p-2 rounded-full mr-2">
                📝
              </button>
              <button className="bg-red-500 p-2 rounded-full">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-darkOliverGreen text-white rounded-lg mr-2 disabled:bg-gray-400 hover:bg-paleGreen "
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg mx-1 ${
              currentPage === i + 1
                ? "bg-darkOliverGreen text-white hover:bg-paleGreen "
                : "bg-gray-300 text-black hover:bg-paleGreen"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-darkOliverGreen text-white rounded-lg ml-2 disabled:bg-gray-400 hover:bg-paleGreen "
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookingTable;
