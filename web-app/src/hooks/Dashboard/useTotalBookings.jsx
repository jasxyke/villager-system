import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useTotalBookings = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTotalBookings = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/total-bookings-this-month");
      setTotalBookings(response.data.total_bookings);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch total bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalBookings();
  }, []);

  return { totalBookings, loading, error, fetchTotalBookings };
};

export default useTotalBookings;
