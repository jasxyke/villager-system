import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async (year, month, amenityId) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(`/bookings/public`, {
        year: year,
        month: month,
        amenityId: amenityId,
      });

      console.log(response.data);

      const data = response.data;

      // const mappedBookings = data.reduce((acc, booking) => {
      //   const date = booking.booking_date;
      //   const timeSlot = `${booking.start_time} - ${booking.end_time}`;

      //   if (!acc[date]) {
      //     acc[date] = [];
      //   }
      //   acc[date].push(timeSlot);
      //   return acc;
      // }, {});

      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error.response.data.message);
      setLoading(false);
    }
  };

  const handleReserveTime = async (amenityId, bookingDate, timeToReserve) => {
    if (amenityId && bookingDate && timeToReserve) {
      try {
        const response = await axiosClient.post("/bookings", {
          amenity_id: amenityId,
          booking_date: bookingDate,
          start_time: timeToReserve.split(" - ")[0],
          end_time: timeToReserve.split(" - ")[1],
          // Add other required fields like full_name, email, etc.
        });

        if (response.status === 200) {
          fetchBookings(amenityId); // Refresh bookings after a successful reservation
        } else {
          console.error("Failed to reserve time");
        }
      } catch (error) {
        console.error("Error reserving time:", error);
      }
    }
  };

  return { bookings, fetchBookings, handleReserveTime, loading };
};

export default useBookings;
