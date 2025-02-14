import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";
import { useAlert } from "../contexts/AlertBox/AlertContext";

const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showAlert } = useAlert();

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/admins");
      console.log(response.data);

      setAdmins(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/admins/${id}`);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async (data) => {
    setLoading(true);
    try {
      const response = await axiosClient.post("/admins", data);
      fetchAdmins(); // Refresh the list after creating an admin
      return response.data;
    } catch (err) {
      setError(err);
      showAlert(err.response.data.message, true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async (id, data) => {
    setLoading(true);
    try {
      const response = await axiosClient.put(`/admins/${id}`, data);
      fetchAdmins(); // Refresh the list after updating an admin
      return response.data;
    } catch (err) {
      showAlert(err.response.data.message, true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async (id) => {
    setLoading(true);
    try {
      await axiosClient.delete(`/admins/${id}`);
      fetchAdmins(); // Refresh the list after deleting an admin
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    admins,
    loading,
    error,
    fetchAdmins,
    fetchAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
  };
};

export default useAdmins;
