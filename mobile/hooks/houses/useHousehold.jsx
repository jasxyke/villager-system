import { useState } from "react";
import axiosClient from "../../utils/axios";

const useHouseHold = () => {
  const [house, setHouse] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch house members
  const fetchHouseMembers = async (houseId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`/houses/members/${houseId}`);
      const data = response.data;

      console.log(data);

      setHouse(data.house);
      setResidents(data.residents);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    house,
    residents,
    loading,
    error,
    fetchHouseMembers,
  };
};

export default useHouseHold;
