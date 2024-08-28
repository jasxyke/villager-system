import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchTransactions = async (month, year, search, page) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/transactions/recent-paid", {
        month,
        year,
        search,
        page,
      });

      setTransactions(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
    } catch (err) {
      console.log(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (month, year, searchQuery, page) => {
    fetchTransactions(month, year, searchQuery, page);
  };

  return {
    transactions,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchTransactions,
    changePage,
  };
};

export default useTransactions;
