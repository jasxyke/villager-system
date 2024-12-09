import React, { useState } from "react";
import axiosClient from "../../utils/axios";

const useFetchApprovedStickerRequests = () => {
  const [approvedStickerRequests, setApprovedStickerRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApprovedStickerRequests = async (residentId) => {
    setLoading(true);
    try {
      // Make an API call to fetch approved sticker requests
      const response = await axiosClient.get(
        `/approved-sticker-requests/${residentId}`
      );
      setApprovedStickerRequests(response.data); // Assuming the response data contains the list of requests
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching approved sticker requests"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    approvedStickerRequests,
    loading,
    error,
    refetch: fetchApprovedStickerRequests,
  };
};

export default useFetchApprovedStickerRequests;
