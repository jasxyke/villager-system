import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios"; // Ensure the path to your axios client is correct

const usePendingCarStickerRequests = (residentId) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/car-sticker-requests`);
      setRequests(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { requests, loading, error, fetchPendingRequests };
};

export default usePendingCarStickerRequests;
