import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";

const usePermitRequests = () => {
  const [permitRequests, setPermitRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch permit requests
  const fetchPermitRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get("/permit-requests");
      setPermitRequests(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve a permit request
  const approvePermitRequest = async (id, data) => {
    try {
      const response = await axiosClient.post(
        `/permit-requests/${id}/approve`,
        data
      );
      // Update the state with the approved permit request
      setPermitRequests((prev) =>
        prev.map((permit) =>
          permit.id === id ? response.data.permit_request : permit
        )
      );
      return response.data; // Return the response data
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw error for handling in component
    }
  };

  // Reject a permit request
  const rejectPermitRequest = async (id, reason) => {
    try {
      const response = await axiosClient.post(`/permit-requests/${id}/reject`, {
        reason,
      });
      // Update the state with the rejected permit request
      setPermitRequests((prev) =>
        prev.map((permit) =>
          permit.id === id ? response.data.permit_request : permit
        )
      );
      return response.data; // Return the response data
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw error for handling in component
    }
  };

  useEffect(() => {
    fetchPermitRequests();
  }, []);

  return {
    permitRequests,
    loading,
    error,
    approvePermitRequest,
    rejectPermitRequest,
  };
};

export default usePermitRequests;
