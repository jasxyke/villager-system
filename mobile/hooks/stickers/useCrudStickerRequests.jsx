import { useState, useCallback } from "react";
import axiosClient from "../../utils/axios";

const useCrudCarStickerRequests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * Fetch car sticker request details by ID.
   */
  const fetchCarStickerRequest = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/approved-sticker-request/${id}`);
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while fetching the car sticker request."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update car sticker request by ID.
   */
  const updateCarStickerRequest = useCallback(async (id, payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.put(
        `/car-sticker-requests/${id}`,
        payload
      );
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while updating the car sticker request."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete car sticker request by ID.
   */
  const deleteCarStickerRequest = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.delete(`/car-sticker-requests/${id}`);
      setData(response.data); // Message from delete response
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while deleting the car sticker request."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    fetchCarStickerRequest,
    updateCarStickerRequest,
    deleteCarStickerRequest,
  };
};

export default useCrudCarStickerRequests;
