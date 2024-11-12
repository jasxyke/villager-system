import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchBills = async (status, month, year, search, page) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/bills/admin", {
        status,
        month,
        year,
        search,
        page,
      });

      console.log(response.data.bills.data);
      console.log(response.data);

      setBills(response.data.bills.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
    } catch (err) {
      console.log(err);
      console.log(err.data.response.message);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (status, month, year, searchQuery, page) => {
    fetchBills(status, month, year, searchQuery, page);
  };

  const updateBillAndAddPayment = async (data, onSucess) => {
    setLoading(true);
    try {
      // Make the API call to update the bill and add payment
      const response = await axiosClient.post("/bills/pay-edit-bill", data);

      // After a successful update, refresh the list of bills
      // You might need to adjust the parameters based on your current filters
      if (response.data.success) {
        console.log(response.data.success);
        onSucess();
      }
      return response.data.success;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    bills,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchBills,
    changePage,
    updateBillAndAddPayment, // Add this to the returned object
  };
};

export default useBills;
