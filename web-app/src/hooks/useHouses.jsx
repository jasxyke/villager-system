import React, { useState } from "react";
import axiosClient from "../utils/axios";

const useHouses = () => {
  const [houses, setHouses] = useState(null);
  const [house, setHouse] = useState(null); // State for a single house
  const [loading, setLoading] = useState(false);

  const getHousesPerBlocks = async (blocks, onSuccess, onError) => {
    try {
      const res = await axiosClient.post("/houses/blocks", {
        filteredBlocks: blocks,
      });
      console.log(res);
      setHouses(res.data.data);
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error);
      onError(error.response.data.message);
    }
  };

  const getHousesPerBlock = async (blockNumber, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/houses/block/" + blockNumber);
      console.log(res);
      setHouses(res.data);
      onSuccess(res.data);
    } catch (error) {
      console.log(error.response.data.message);
      onError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const addHouse = async (houseData, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/houses", houseData);
      onSuccess(res.data.message, res.data.house);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      onError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const searchHouseByOwnerName = async (ownerName, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(
        `/houses/search?ownerName=${ownerName}`
      );
      console.log(res);
      setHouse(res.data); // Update the single house state with the found house
      onSuccess(res.data); // Pass the result to the onSuccess callback
    } catch (error) {
      console.log(error.response.data.message);
      onError(error.response.data.message); // Pass the error message to the onError callback
    } finally {
      setLoading(false);
    }
  };

  return {
    houses,
    house, // Expose the single house state
    loading,
    getHousesPerBlocks,
    getHousesPerBlock,
    addHouse,
    searchHouseByOwnerName, // Expose the new function
  };
};

export default useHouses;
