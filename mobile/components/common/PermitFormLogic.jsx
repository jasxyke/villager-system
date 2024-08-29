import { useState } from "react";
import { Alert } from "react-native";

export const usePermitFormLogic = () => {
  const [purpose, setPurpose] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [images, setImages] = useState([]); // Updated to handle image selection

  const handleSquareMetersChange = (value) => {
    setSquareMeters(value);
  };

  const handleSubmit = () => {
    const newTransaction = {
      purpose: purpose,
      floorSize: squareMeters,
      images: images, // Include the selected images
    };
  };

  return {
    purpose,
    setPurpose,
    squareMeters,
    handleSquareMetersChange,
    handleSubmit,
    setSquareMeters,
    images,
    setImages, // Added for image management
  };
};
