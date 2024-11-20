import { useState } from "react";
import axiosClient from "../../utils/axios";

const useResidentProfileReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [residentData, setResidentData] = useState([]); // State to store resident profile data

  // Function to fetch the PDF report
  const fetchResidentProfileReport = async () => {
    setLoading(true);
    try {
      // Make the API call to generate and download the report
      const response = await axiosClient.get("/reports/profile-pdf", {
        responseType: "blob", // Important for handling binary data (PDF)
      });

      // Create a URL for the PDF file and open it in a new tab
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Resident_Profile_Report.pdf");
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

  // Function to fetch resident profile data for display
  const fetchResidentProfileData = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/reports/profile-data");
      setResidentData(response.data.residents); // Set the retrieved data in state
    } catch (err) {
      console.error("Failed to fetch resident profile data:", err);
      setError("An error occurred while fetching the resident profile data.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    residentData, // Return the resident profile data
    fetchResidentProfileReport,
    fetchResidentProfileData, // Function to fetch profile data
  };
};

export default useResidentProfileReports;
