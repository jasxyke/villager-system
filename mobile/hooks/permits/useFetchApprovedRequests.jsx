import React, { useState, useEffect } from "react";
import axiosClient from "../../utils/axios";

const useFetchApprovedRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApprovedRequests = async (residentId) => {
    setLoading(true);
    try {
      // Make an API call to fetch approved requests
      const response = await axiosClient.get(`/approved-permits/${residentId}`);
      setApprovedRequests(response.data); // Assuming the response data contains the list of requests
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching approved requests"
      );
    } finally {
      setLoading(false);
    }
  };

  return { approvedRequests, loading, error, refetch: fetchApprovedRequests };
};

export default useFetchApprovedRequests;
