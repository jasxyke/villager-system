import { useState, useCallback } from "react";
import axiosClient from "../../utils/axios";

const useExportIncomeExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exportReport = useCallback(async (year, month) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.post(
        "/export-income-expenses",
        {
          year,
          month,
        },
        {
          responseType: "blob", // Important to handle file downloads
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      // // Create a URL for the downloaded file
      // const blob = new Blob([response.data], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      // });
      // const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Income_Expenses_Report_${year}_${month}.pdf`
      );

      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "An error occurred while exporting the report."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    exportReport,
  };
};

export default useExportIncomeExpenses;
