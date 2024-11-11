import { useState, useEffect } from "react";
import axiosClient from "../utils/axios";

const useTotalResidents = () => {
  const [totalResidents, setTotalResidents] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTotalResidents = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/total-residents");
      console.log(response); // Log the response to see if you get data
      setTotalResidents(response.data.total_residents);
      setLoading(false);
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to fetch total residents");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalResidents();
  }, []);

  return { totalResidents, loading, error, fetchTotalResidents };
};

export default useTotalResidents;
