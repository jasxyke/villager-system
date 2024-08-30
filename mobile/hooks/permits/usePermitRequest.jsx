import React, { useState } from "react";
import axiosClient from "../../utils/axios";

const usePermitRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const submitPermitRequest = async ({ purpose, floorSize, documents }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("purpose", purpose);
      formData.append("floorSize", floorSize);

      if (documents && documents.length > 0) {
        documents.forEach((doc, index) => {
          formData.append(`documents[${index}]`, {
            uri: doc.uri,
            name: `document_${index}.jpg`, // Change extension if needed
            type: "image/jpeg", // Adjust MIME type according to file type
          });
          formData.append(`descriptions[${index}]`, doc.description || "");
        });
      }

      const response = await axiosClient.post("/permit-requests", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);

      setSuccessMessage(response.data.message);
      return response.data.message;
    } catch (error) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    successMessage,
    submitPermitRequest,
  };
};

export default usePermitRequest;
