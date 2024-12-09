import { useState } from "react";
import axiosClient from "../../utils/axios";

const useCarStickerRequests = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to approve the car sticker request
  const updateCarStickerRequest = async (
    id,
    stickerFee,
    // processingFee,
    note
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Prepare the data payload
      const data = {
        sticker_fee: stickerFee,
        // processing_fee: processingFee,
        note: note,
      };

      // Make the API request to approve the car sticker request
      const response = await axiosClient.put(
        `/car-sticker-requests/approve/${id}`,
        data
      );

      // Handle success response
      setSuccess(true);
      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to update car sticker request.");
    } finally {
      setLoading(false);
    }
  };

  // Function to reject the car sticker request
  const rejectCarStickerRequest = async (id, rejectionNote) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Prepare the data payload for rejection
      const data = {
        note: rejectionNote,
      };

      // Make the API request to reject the car sticker request
      const response = await axiosClient.put(
        `/car-sticker-requests/${id}/reject`,
        data
      );

      // Handle success response
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error(err);
      setError("Failed to reject car sticker request.");
    } finally {
      setLoading(false);
    }
  };

  // Function to mark the car sticker request as completed
  const completeCarStickerRequest = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Make the API request to complete the car sticker request
      const response = await axiosClient.put(
        `/car-sticker-requests/${id}/complete`
      );

      // Handle success response
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error(err);
      setError("Failed to complete car sticker request.");
    } finally {
      setLoading(false);
    }
  };

  // Function to mark the car sticker request as claimed
  const claimCarStickerRequest = async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Make the API request to claim the car sticker request
      const response = await axiosClient.put(
        `/car-sticker-requests/${id}/claim`
      );

      // Handle success response
      setSuccess(true);
      return response.data;
    } catch (err) {
      console.error(err);
      setError("Failed to claim car sticker request.");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCarStickerRequest,
    rejectCarStickerRequest,
    completeCarStickerRequest,
    claimCarStickerRequest, // Added function to claim the request
    loading,
    error,
    success,
  };
};

export default useCarStickerRequests;
