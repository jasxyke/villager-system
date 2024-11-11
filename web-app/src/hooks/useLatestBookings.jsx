import { useEffect, useState } from "react";
import axiosClient from "../utils/axios";

const useBookings = (amenityId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Make sure you're calling the correct endpoint
      const response = await axiosClient.get(`/${amenityId}`);
      console.log("Bookings fetched:", response.data); // Log the response for debugging
      setBookings(response.data.data); // Adjust based on the response structure
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amenityId) {
      fetchBookings();
    }
  }, [amenityId]);

  return { bookings, loading, error };
};

export default useBookings;
