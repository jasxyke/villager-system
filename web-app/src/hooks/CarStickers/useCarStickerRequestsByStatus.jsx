import { useState } from "react";
import axiosClient from "../../utils/axios";

const useCarStickerRequestsByStatus = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchRequestsByStatus = async (status, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Make the API request to get car sticker requests by status
      const response = await axiosClient.get(
        `/car-sticker-requests/status/${status}?page=${page}`
      );

      setRequests(response.data.data); // Store the paginated data
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch car sticker requests.");
    } finally {
      setLoading(false);
    }
  };

  const changePage = (status, page) => {
    fetchRequestsByStatus(status, page);
  };

  return {
    fetchRequestsByStatus,
    requests,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    changePage,
  };
};

export default useCarStickerRequestsByStatus;
