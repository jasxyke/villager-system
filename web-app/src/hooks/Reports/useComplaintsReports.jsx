import { useState } from "react";
import axiosClient from "../../utils/axios";

const useComplaintsReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complaintsData, setComplaintsData] = useState([]); // State to store complaints data

  // Function to fetch the PDF report for complaints
  const fetchComplaintsReport = async () => {
    setLoading(true);
    try {
      // Make the API call to generate and download the report
      const response = await axiosClient.get("/reports/complaints-pdf", {
        responseType: "blob", // Important for handling binary data (PDF)
      });

      // Create a URL for the PDF file and open it in a new tab
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");

      fileLink.href = fileURL;
      fileLink.setAttribute("download", "Complaints_Report.pdf");
      document.body.appendChild(fileLink);
      fileLink.click();

      return true;
    } catch (err) {
      console.error("Failed to generate the complaints report:", err);
      setError("An error occurred while generating the complaints report.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch complaints data for display
  const fetchComplaintsData = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/reports/complaints-data");
      setComplaintsData(response.data.complaints); // Set the retrieved data in state
    } catch (err) {
      console.error("Failed to fetch complaints data:", err);
      setError("An error occurred while fetching the complaints data.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    complaintsData, // Return the complaints data
    fetchComplaintsReport,
    fetchComplaintsData, // Function to fetch complaints data
  };
};

export default useComplaintsReports;
