import { useState } from 'react';
import { Alert } from 'react-native';

export const usePermitFormLogic = (addTransaction) => {
  const [selectedService, setSelectedService] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState('');
  const [squareMeters, setSquareMeters] = useState('');
  const [fileName, setFileName] = useState('');
  const [showPermitForm, setShowPermitForm] = useState(false);

  const services = ['Building Permit', 'Car Sticker', 'Construction Supply Permit'];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
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
    let newPrice = '';
    const area = parseInt(squareMeters);

    switch (service) {
      case 'Building Permit':
        newPrice = area > 100 ? 'Php 600.00' : 'Php 500.00';
        break;
      case 'Car Sticker':
        newPrice = 'Php 600.00';
        break;
      case 'Construction Supply Permit':
        newPrice = 'Php 300.00';
        break;
      default:
        newPrice = '';
    }
    setPrice(newPrice);
  };

  const handleFileUpload = () => {
    // Logic for file upload
    // Set fileName after uploading
    setFileName('uploaded-file.pdf'); // Example file name
  };

  const handleSubmit = () => {
    if (!selectedService || !price) {
      Alert.alert('Error', 'Please fill out all required fields.');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(), // Unique ID based on timestamp
      service: selectedService,
      date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      price: price,
      fileName: fileName || 'No file uploaded', // Include file name if available
    };

    addTransaction(newTransaction);
    setShowPermitForm(false);
  };

  const handleCloseOrCancel = () => {
    // Clear form fields if needed
    setSelectedService('');
    setDate(new Date());
    setPrice('');
    setSquareMeters('');
    setFileName('');
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
    handleCloseOrCancel,
    setShowDatePicker,
    setDate,
    setSelectedService,
    setPrice,
    setSquareMeters,
    fileName,
    setFileName,
    showPermitForm,
    setShowPermitForm,
    handleFileUpload, // Export file upload handler
  };
};
