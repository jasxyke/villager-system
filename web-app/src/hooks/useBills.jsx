import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";

const useBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchBills = async (
    status = "pending",
    month = null,
    year = null,
    search = "",
    page = 1
  ) => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/bills/admin", {
        params: {
          status,
          month,
          year,
          search,
          page,
        },
      });

      setBills(response.data.bills.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page) => {
    fetchBills(undefined, undefined, undefined, undefined, page);
  };

  const updateBillAndAddPayment = async (data) => {
    setLoading(true);
    try {
      // Make the API call to update the bill and add payment
      const response = await axiosClient.post("/bills/pay-edit-bill", data);

      // After a successful update, refresh the list of bills
      // You might need to adjust the parameters based on your current filters
      fetchBills(
        data.status || "pending",
        data.month,
        data.year,
        data.search,
        currentPage
      );

      return response.data.message;
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
