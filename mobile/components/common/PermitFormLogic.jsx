// PermitFormLogic.js
import { useState } from 'react';

export const usePermitFormLogic = () => {
  const [modalVisible, setModalVisible] = useState(true); // Form is visible by default
  const [selectedService, setSelectedService] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState('');
  const [squareMeters, setSquareMeters] = useState('');

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
    if (service === 'Building Permit') {
        const area = parseInt(squareMeters);
        if (area && area > 100) {
          newPrice = 'Php 600.00';
        } else {
          newPrice = 'Php 500.00';
        }
    } else if (service === 'Car Sticker') {
        newPrice = 'Php 600.00';
      }
     else if (service === 'Construction Supply Permit') {
      newPrice = 'Php 300.00';
    };
    setPrice(newPrice);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Service:', selectedService);
    console.log('Date:', date);
    console.log('Price:', price);
    setModalVisible(false); // Close the modal after submission
  };

  const handleCancel = () => {
    setModalVisible(false);
    setTimeout(() => setModalVisible(true), 100); // Reopen the modal to keep the form active
  };

  return {
    modalVisible,
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
    handleCancel,
    setShowDatePicker,
    setDate,
    setSelectedService,
    setPrice,
    setSquareMeters,
  };
};
