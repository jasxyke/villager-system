import { useState, useCallback } from "react";
import axiosClient from "../../utils/axios";

const useCrudPermits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * Fetch permit request details by ID.
   */
  const fetchPermitRequest = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/get-permit-request/${id}`);
      setData(response.data);
      //   console.log("permit request:");
      //   console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while fetching the permit request."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update permit request by ID.
   */
  const updatePermitRequest = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.put(`/permit-requests/${id}`, payload);
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while updating the permit request."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete permit request by ID.
   */
  const deletePermitRequest = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.delete(`/permit-requests/${id}`);
      setData(response.data); // Message from delete response
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while deleting the permit request."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    fetchPermitRequest,
    updatePermitRequest,
    deletePermitRequest,
  };
};

export default useCrudPermits;
