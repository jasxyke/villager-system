import { useState, useEffect } from "react";
import axiosClient from "../utils/axios"; // Assuming you're using this for Axios

const useResidentWithMostUnpaidBills = (month, year) => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResident = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/most-unpaid", {
        params: { month, year },
      });
      console.log(response); // Log the response to see if you get the correct data
      setResident(response.data); // Assuming this is the structure you want to store
      setLoading(false);
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to fetch the resident with most unpaid bills");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResident();
  }, [month, year]); // Re-run when month or year changes

  return { resident, loading, error, fetchResident }; // Return fetchResident in case you need to trigger it manually
};

export default useResidentWithMostUnpaidBills;
