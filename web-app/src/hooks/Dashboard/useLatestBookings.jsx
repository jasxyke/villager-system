import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useLatestBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchPendingBookings = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/bookings/recent-pending?page=${page}`
      );

      setBookings(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
      console.log(response.data.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page) => {
    fetchPendingBookings(page);
  };

  useEffect(() => {
    fetchPendingBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchPendingBookings,
    changePage,
  };
};

export default useLatestBookings;
