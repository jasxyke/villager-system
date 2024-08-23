import React, { useState } from "react";
import axiosClient from "../utils/axios";

const useResidents = () => {
  const [residents, setResidents] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllResidents = async (onSucces, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/residents");
      console.log("residents: ");
      console.log(res.data);
      setResidents(res.data);
      setLoading(false);
    } catch (error) {
      console.log(erorr.response.data.message);
      onError(erorr.response.data.message);
    }
  };
  //for changing the page of the pagination
  const changePage = (page) => {
    console.log("page changed to: " + page);

    setLoading(true);
    axiosClient
      .get("/residents?page=" + page)
      .then((res) => {
        setResidents(res.data);
        console.log(res.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const addResident = async (residentData, onSuccess, onError) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/residents", residentData);
      onSuccess(res.data.message, res.data.resident);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      onError(error.response.data.message);
    }
  };

  const editResident = async (
    residentId,
    editedResident,
    onSucces,
    onError,
    singleResident = false
  ) => {
    if (singleResident) {
      try {
        setLoading(true);
        const res = await axiosClient.put(
          "/residents/" + residentId,
          editedResident
        );
        console.log("edited resident in house: ");
        console.log(res.data);
        onSucces(res.data.message, res.data.user);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        onError(error.response.data.message);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await axiosClient.put(
          "/residents/" + residentId,
          editedResident
        );

        onSucces("Resident edited!", res.data.user);
        getAllResidents();
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        onError(error.response.data.message);
        setLoading(false);
      }
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

  return {
    residents,
    getResidents,
    deleteResident,
    getAllResidents,
    editResident,
    loading,
    changePage,
    addResident,
  };
};

export default useResidents;
