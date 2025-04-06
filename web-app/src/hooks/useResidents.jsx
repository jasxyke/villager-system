import React, { useState } from "react";
import axiosClient from "../utils/axios";

const useResidents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch all residents with pagination
  const fetchResidents = async (page) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/residents?page=${page}`);
      setResidents(res.data.data);
      console.log(res.data.data);

      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
      setTotal(res.data.total);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // For changing the page in pagination
  const changePage = (page) => {
    fetchResidents(page);
  };

  // Adding a resident
  const addResident = async (residentData, onSuccess, onError) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/residents", residentData);
      onSuccess(res.data.message, res.data.resident);
    } catch (error) {
      onError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Editing a resident
  const editResident = async (
    residentId,
    editedResident,
    onSuccess,
    onError
  ) => {
    setLoading(true);
    try {
      const res = await axiosClient.put(
        `/residents/${residentId}`,
        editedResident
      );
      onSuccess(res.data.message, res.data.resident);
      fetchResidents(currentPage); // Refresh the list after editing
    } catch (error) {
      onError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Deleting a resident
  const deleteResident = async (userId, onSuccess, onError) => {
    try {
      const res = await axiosClient.delete(`/residents/${userId}`);
      onSuccess(userId, res.data.message);
    } catch (error) {
      onError(error.response?.data?.message || error.message);
    }
  };

  return {
    residents,
    loading,
    error,
    currentPage,
    lastPage,
    total,
    fetchResidents,
    changePage,
    addResident,
    editResident,
    deleteResident,
  };
};

export default useResidents;
