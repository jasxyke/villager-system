import React, { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useHomeowners = () => {
  const [homeowners, setHomeowners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch homeowners with pagination
  const fetchHomeowners = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/residents/homeowners?page=${page}`);
      setHomeowners(res.data.data); // Store homeowners data

      // Update pagination details
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
      setTotal(res.data.total);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch homeowners when the hook is first used
  useEffect(() => {
    fetchHomeowners(currentPage);
  }, [currentPage]);

  // For changing the page in pagination
  const changePage = (page) => {
    setCurrentPage(page);
    fetchHomeowners(page);
  };

  return {
    homeowners,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchHomeowners,
    changePage,
  };
};

export default useHomeowners;
