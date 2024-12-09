import { useState } from "react";
import axiosClient from "../../utils/axios"; // Ensure the path to your axios client is correct

const useCarStickers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const createCarStickerRequest = async (carModel, plateNumber, vehicleType, images) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create FormData object to handle file uploads
      const formData = new FormData();
      formData.append("car_model", carModel);
      formData.append("car_plate_number", plateNumber);
      formData.append("sticker_type", vehicleType); // Add sticker_type to the form data

      if (images && images.length > 0) {
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, {
            uri: image.uri,
            name: `image_${index}.jpg`,
            type: "image/jpeg",
          });
          formData.append(`descriptions[${index}]`, image.description);
        });
      }

      const response = await axiosClient.post(
        "/car-sticker-requests",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);
      setSuccess(response.data.message);
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
    success,
    createCarStickerRequest,
  };
};

export default useCarStickers;
