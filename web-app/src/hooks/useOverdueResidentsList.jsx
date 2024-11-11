import { useState, useEffect } from "react";
import axiosClient from "../utils/axios"; // Adjust the path if necessary

const useOverdueResidentsList = () => {
  const [overdueResidents, setOverdueResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverdueResidents = async () => {
      try {
        const response = await axiosClient.get("/overdue-residents");
        setOverdueResidents(response.data.bills); // Adjust the response data structure if needed
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch overdue residents");
        setLoading(false);
      }
    };

    fetchOverdueResidents();
  }, []);

  return { overdueResidents, loading, error };
};

export default useOverdueResidentsList;
