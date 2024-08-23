import React, { useState } from "react";
import axiosClient from "../utils/axios";

const useHouses = () => {
  const [houses, setHouses] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHousesPerBlocks = async (blocks, onSucess, onError) => {
    try {
      const res = await axiosClient.post("/houses/blocks", {
        filteredBlocks: blocks,
      });
      console.log(res);

      setHouses(res.data.data);
    } catch (error) {
      console.log(error);

      console.log(error.response.data.message);
      onError(error.response.data.message);
    }
  };

  const getHousesPerBlock = async (blockNumber, onSucess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/houses/block/" + blockNumber);
      console.log(res);
      setHouses(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      //onError(error.response.data.message);
    }
  };

  const addHouse = async (houseData, onSuccess, onError) => {
    try {
      const res = await axiosClient.post("/houses", houseData);
      onSuccess(res.data.message, res.data.house);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      onError(error.response.data.message);
    }
  };

  return { houses, loading, getHousesPerBlocks, getHousesPerBlock, addHouse };
};

export default useHouses;
