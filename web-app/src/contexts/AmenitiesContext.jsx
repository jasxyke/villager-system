import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../utils/axios";
import { useAuthContext } from "./AuthContext";

// Create the context
const AmenitiesContext = createContext();

// Create a provider component
export const AmenitiesProvider = ({ children }) => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuthContext();

  // Fetch all amenities
  const fetchAmenities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get("/amenities");
      setAmenities(response.data);
    } catch (err) {
      setError("Failed to fetch amenities");
    } finally {
      setLoading(false);
    }
  };

  // Create a new amenity
  const createAmenity = async (amenityData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post("/amenities", amenityData);
      setAmenities((prevAmenities) => [...prevAmenities, response.data]);
    } catch (err) {
      setError("Failed to create amenity");
    } finally {
      setLoading(false);
    }
  };

  // Get a single amenity by ID
  const fetchAmenity = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(`/amenities/${id}`);
      return response.data;
    } catch (err) {
      setError("Failed to fetch amenity");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing amenity
  const updateAmenity = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.put(`/amenities/${id}`, updatedData);
      setAmenities((prevAmenities) =>
        prevAmenities.map((amenity) =>
          amenity.id === id ? { ...amenity, ...updatedData } : amenity
        )
      );
    } catch (err) {
      setError("Failed to update amenity");
    } finally {
      setLoading(false);
    }
  };

  // Delete an amenity
  const deleteAmenity = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosClient.delete(`/amenities/${id}`);
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.id !== id)
      );
    } catch (err) {
      setError("Failed to delete amenity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchAmenities();
    }
  }, [isLoggedIn()]);

  return (
    <AmenitiesContext.Provider
      value={{
        amenities,
        loading,
        error,
        fetchAmenities,
        createAmenity,
        fetchAmenity,
        updateAmenity,
        deleteAmenity,
      }}
    >
      {children}
    </AmenitiesContext.Provider>
  );
};

// Custom hook to use the Amenities context
export const useAmenities = () => {
  const context = useContext(AmenitiesContext);

  if (!context) {
    throw new Error("useAmenities must be used within an AmenitiesProvider");
  }
  return context;
};
