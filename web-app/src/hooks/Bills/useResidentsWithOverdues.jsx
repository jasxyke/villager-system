import { useState, useEffect } from "react";
import axiosClient from "../../utils/axios"; // Adjust the import path as necessary

const useResidentsWithOverdues = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  // Function to fetch residents with overdue bills
  const fetchResidents = async (page = 1) => {
    setLoading(true);
    try {
      const route = `/bills-resident-overdues/${page}`;
      const response = await axiosClient.post(route, { search });

      setResidents(response.data.data); // Adjust according to API response structure
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);

      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to change page
  const changePage = (page) => {
    fetchResidents(page);
  };

  // Initial fetch
  useEffect(() => {
    fetchResidents(); // Fetch the first page by default
  }, [search]);

  return {
    residents,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    search,
    fetchResidents,
    changePage,
    setSearch,
  };
};

export default useResidentsWithOverdues;
