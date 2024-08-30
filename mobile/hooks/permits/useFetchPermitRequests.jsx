import React, { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useFetchPermitRequests = () => {
  const [permitRequests, setPermitRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPermitRequests = async (residentId) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/permits/resident/${residentId}`);
      setPermitRequests(response.data.permits);
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching permits"
      );
    } finally {
      setLoading(false);
    }
  };

  return { permitRequests, loading, error, refetch: fetchPermitRequests };
};

export default useFetchPermitRequests;
