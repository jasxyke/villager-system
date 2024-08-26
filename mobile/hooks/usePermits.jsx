import { useState } from "react";
import axiosClient from "../utils/axios";
import { Alert } from "react-native";

const usePermits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitPermitRequest = async (permitData, selectedImages) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("service", permitData.service);
    formData.append("date", permitData.date);
    formData.append("price", permitData.price);
    formData.append("square_meters", permitData.squareMeters);

    selectedImages.forEach((image, index) => {
      formData.append(`images[${index}]`, {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    });

    try {
      const response = await axiosClient.post("/permits", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      Alert.alert("Success", "Permit request submitted successfully.");
    } catch (error) {
      console.error(
        "Error submitting permit request:",
        error.response?.data || error
      );
      setError(error.response?.data?.message || "An error occurred");
      Alert.alert("Error", "Failed to submit permit request.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    submitPermitRequest,
  };
};

export default usePermits;
