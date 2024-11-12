import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";
import { formatTime } from "../../utils/DataFormatter";

const useBookings = (selectedAmenity) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/admins/bookings/${selectedAmenity}`
      );
      setBookings(response.data.data);
      console.log(response.data);

      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page) => {
    console.log("page changed to: " + page);

    setLoading(true);
    axiosClient
      .get("/bookings?page=" + page)
      .then((res) => {
        setBookings(res.data.data);
        console.log(res.data);
        setCurrentPage(res.data.current_page);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateBooking = async (bookingData, payments) => {
    try {
      setLoading(true);
      const data = {
        ...bookingData,
        payments: payments,
        booking_id: bookingData.id,
        start_time: formatTime(bookingData.start_time),
        end_time: formatTime(bookingData.end_time),
      };
      console.log(data);

      const response = await axiosClient.put("/bookings/", data);
      console.log(response);

      return response.data.success;
    } catch (error) {
      console.log(error);

      setError("Failed to save the booking.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    loading,
    error,
    changePage,
    currentPage,
    fetchBookings,
    lastPage,
    updateBooking,
  };
};

export default useBookings;
