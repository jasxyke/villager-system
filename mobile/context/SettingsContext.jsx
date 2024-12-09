// src/context/SettingsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axiosClient from "../utils/axios";
import { useAuthContext } from "./AuthContext";

// Create the context
const SettingsContext = createContext();

// Create the provider component
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loggedIn } = useAuthContext();

  // Fetch all settings from the API
  const fetchSettings = async () => {
    try {
      const response = await axiosClient.get("/settings");
      setSettings(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single setting by key from the API
  const fetchSettingByKey = async (key) => {
    try {
      const response = await axiosClient.get(`/settings/${key}`);
      return response.data[key];
    } catch (err) {
      setError(err.message);
    }
  };

  // Update settings via the API
  const updateSettings = async (newSettings) => {
    try {
      const formData = new FormData();

      // Append each key-value pair to the FormData object
      for (const key in newSettings) {
        const value = newSettings[key];

        // Check if the value is a file (e.g., for images)
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }

      console.log(formData);

      const response = await axiosClient.post("/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Merge updated settings into the current settings
      // setSettings((prevSettings) => ({
      //   ...prevSettings,
      //   ...newSettings,
      // }));

      fetchSettings();

      console.log(response.data.message);

      return response.data.message;
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  // Load settings once on component mount
  useEffect(() => {
    if (loggedIn) {
      fetchSettings();
    }
  }, [loggedIn]);

  // Provide the settings and functions to children
  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        updateSettings,
        fetchSettingByKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the SettingsContext
export const useSettings = () => {
  return useContext(SettingsContext);
};
