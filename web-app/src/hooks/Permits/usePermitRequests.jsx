import { useState } from "react";
import axiosClient from "../../utils/axios";

const usePermitRequests = () => {
  const [permitRequests, setPermitRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch permit requests with pagination
  const fetchPermitRequests = async (status, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(
        `/permit-requests/${status}?page=${page}`
      );

      setPermitRequests(response.data.data); // Paginated data
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
    } catch (err) {
      setError("Failed to fetch permit requests.");
    } finally {
      setLoading(false);
    }
  };

  const changePage = (status, page) => {
    fetchPermitRequests(status, page);
  };

  return {
    permitRequests,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchPermitRequests,
    changePage,
  };
};

export default usePermitRequests;
