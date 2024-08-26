import { useState } from "react";
import { Alert } from "react-native";

export const usePermitFormLogic = (addTransaction, setShowPermitForm) => {
  const [selectedService, setSelectedService] = useState("Building Permit");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState("");
  const [squareMeters, setSquareMeters] = useState("");
  const [images, setImages] = useState([]); // Updated to handle image selection

  const services = [
    "Building Permit",
    "Car Sticker",
    "Construction Supply Permit",
  ];

  const handleDateChange = (selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleServiceChange = (service) => {
    setSelectedService(service);
    updatePrice(service, squareMeters);
  };

  const handleSquareMetersChange = (value) => {
    setSquareMeters(value);
    updatePrice(selectedService, value);
  };

  const updatePrice = (service, squareMeters) => {
    let newPrice = "";
    const area = parseInt(squareMeters);

    switch (service) {
      case "Building Permit":
        newPrice = area > 100 ? "Php 600.00" : "Php 500.00";
        break;
      case "Car Sticker":
        newPrice = "Php 600.00";
        break;
      case "Construction Supply Permit":
        newPrice = "Php 300.00";
        break;
      default:
        newPrice = "";
    }
    setPrice(newPrice);
  };

  const handleSubmit = () => {
    if (!selectedService || !price || images.length === 0) {
      Alert.alert(
        "Error",
        "Please fill out all required fields and upload at least one image."
      );
      return;
    }

    const newTransaction = {
      id: Date.now().toString(), // Unique ID based on timestamp
      service: selectedService,
      date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      price: price,
      images: images, // Include the selected images
    };

    addTransaction(newTransaction);
    setShowPermitForm(false);
  };

  return {
    selectedService,
    showDatePicker,
    date,
    price,
    squareMeters,
    services,
    handleDateChange,
    handleServiceChange,
    handleSquareMetersChange,
    handleSubmit,
    setShowDatePicker,
    setDate,
    setSelectedService,
    setPrice,
    setSquareMeters,
    images,
    setImages, // Added for image management
  };
};
