import React, { useState } from "react";
import axiosClient from "../utils/axios";

const useResidents = () => {
  const [residents, setResidents] = useState([]);

  const getResidents = async (blockNumber, onSucces, onError) => {
    try {
      const res = await axiosClient.get("/residents/block/" + blockNumber);
      console.log(res.data);
      setResidents(res.data);
      onSucces();
    } catch (error) {
      console.log(error);

      console.log(error.response.data);
      onError(error.response.data.message);
    }
  };

  const deleteResident = async (userId, onSuccess, onError) => {
    try {
      const res = await axiosClient.delete("/residents/" + userId);
      console.log(res.data.message);
      onSuccess(userId, res.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      onError(error.response.data.message);
    }
  };

  return { residents, getResidents, deleteResident };
};

export default useResidents;
