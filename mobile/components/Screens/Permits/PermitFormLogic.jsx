import { useState } from "react";
import { Alert } from "react-native";

export const usePermitFormLogic = () => {
  const [purpose, setPurpose] = useState("");
  // const [squareMeters, setSquareMeters] = useState("");
  const [images, setImages] = useState([]);
  // const handleSquareMetersChange = (value) => {
  //   setSquareMeters(value);
  // };

  const validateForm = () => {
    if (!purpose.trim()) {
      Alert.alert("Validation Error", "Purpose is required.");
      return false;
    }
    // if (squareMeters && isNaN(squareMeters)) {
    //   Alert.alert("Validation Error", "Floor Size must be a number.");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = () => {
    return validateForm();

    const newTransaction = {
      purpose: purpose,
      // floorSize: squareMeters,
      images: images,
    };

    // Perform the submit logic, e.g., sending data to the server\
  };

  return {
    purpose,
    setPurpose,
    // squareMeters,
    // handleSquareMetersChange,
    handleSubmit,
    // setSquareMeters,
    images,
    setImages,
  };
};
