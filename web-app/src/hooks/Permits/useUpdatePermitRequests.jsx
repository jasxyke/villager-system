import { useState } from "react";
import axiosClient from "../../utils/axios";

const useUpdatePermitRequests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to complete the permit request
  const completePermitRequest = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Make the API request to complete the permit request
      const response = await axiosClient.post(
        `/permit-requests/${id}/complete`
      );

      // Handle success response
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error(err);
      setError("Failed to complete permit request.");
    } finally {
      setLoading(false);
    }
  };

  // Function to claim the permit request
  const claimPermitRequest = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Make the API request to claim the permit request
      const response = await axiosClient.put(`/permit-requests/${id}/claim`);

      // Handle success response
      setSuccess(true);
      return response.data.message;
    } catch (err) {
      console.error(err);
      setError("Failed to claim permit request.");
    } finally {
      setLoading(false);
    }
  };

  return {
    completePermitRequest,
    claimPermitRequest, // Added function to claim the permit request
    loading,
    error,
    success,
  };
};

export default useUpdatePermitRequests;
