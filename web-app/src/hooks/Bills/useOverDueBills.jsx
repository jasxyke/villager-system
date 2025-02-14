import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios"; // Adjust the import path as necessary
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const useOverdueBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const { showAlert } = useAlert();

  // Function to fetch overdue bills
  const fetchBills = async (page = 1) => {
    setLoading(true);
    try {
      const route = `/bills/overdue/${page}`;
      const response = await axiosClient.post(route, { search });

      setBills(response.data.bills);
      setCurrentPage(response.data.currentPage);
      setLastPage(response.data.lastPage);
      setTotal(response.data.total);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to notify residents about overdue bills
  const notifyResidents = async (billIds) => {
    try {
      await axiosClient.post("/bills/notify-overdue", { bill_ids: billIds });
      showAlert("Notifications sent successfully", false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  // Function to change page
  const changePage = (page) => {
    fetchBills(page);
  };

  // Initial fetch
  useEffect(() => {
    fetchBills(); // Fetch the first page by default
  }, [search]);

  return {
    bills,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    search,
    fetchBills,
    changePage,
    notifyResidents, // Add the function to notify residents
    setSearch,
  };
};

export default useOverdueBills;
