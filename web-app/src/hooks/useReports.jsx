import { useState } from "react";
import axiosClient from "../utils/axios";

const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [monthsBehindData, setMonthsBehindData] = useState([]); // State to store bill data

  // Function to fetch the PDF report
  const fetchMonthsBehindReport = async () => {
    setLoading(true);
    try {
      // Make the API call to generate and download the report
      const response = await axiosClient.get("/reports/resident-bills", {
        responseType: "blob", // Important for handling binary data (PDF)
      });

      // Create a URL for the PDF file and open it in a new tab
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Resident_Bills_Report.pdf");
      document.body.appendChild(fileLink);
      fileLink.click();

      return true;
    } catch (err) {
      console.error("Failed to generate the report:", err);
      setError("An error occurred while generating the report.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch resident bill data for display
  const fetchMonthsBehindData = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/reports/resident-bill-data");
      setMonthsBehindData(response.data.residents); // Set the retrieved data in state
    } catch (err) {
      console.error("Failed to fetch resident bill data:", err);
      setError("An error occurred while fetching the resident bill data.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    monthsBehindData, // Return the resident bill data
    fetchMonthsBehindReport,
    fetchMonthsBehindData, // Function to fetch bill data
  };
};

export default useReports;
