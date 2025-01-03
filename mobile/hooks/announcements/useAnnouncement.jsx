import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const getAnnouncements = async (page = 1, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/announcements?page=${page}`);
      setAnnouncements(res.data.data); // Assuming the API returns paginated data in `data`
      setCurrentPage(res.data.current_page);
      setTotalPages(res.data.last_page);
      setTotalRecords(res.data.total);
    } catch (error) {
      setLoading(false);
      console.error(error);
      onError && onError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      getAnnouncements(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      getAnnouncements(currentPage - 1);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return {
    announcements,
    getAnnouncements,
    loading,
    currentPage,
    totalPages,
    totalRecords,
    nextPage,
    prevPage,
  };
};

export default useAnnouncement;
