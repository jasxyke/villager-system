import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchBookings = async (year, month, amenityId) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(`/bookings/public`, {
        year: year,
        month: month,
        amenityId: amenityId,
      });

      // console.log(response.data);

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

  const submitBooking = async (bookingDetails) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.post("/bookings", bookingDetails);
      console.log(response);

      setSuccess(response.data.message);
      return response.data.booking;
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return {
    bookings,
    fetchBookings,
    loading,
    submitBooking,
  };
};

export default useBookings;
