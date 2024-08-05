import React from "react";
import axiosClient from "../../utils/axios";
import { useAuthContext } from "../../context/AuthContext";

const useUser = () => {
  const { setUser } = useAuthContext();
  const updateUser = async (user, onUpdate, onError) => {
    const userForm = {
      lastname: user.lastname,
      firstname: user.firstname,
      middlename: user.middlename,
      fbName: user.resident.fb_name,
      civilStatus: user.resident.civil_status,
      occupation: user.resident.occupation_status,
    };
    try {
      const res = await axiosClient.put("/users/" + user.id, userForm);
      setUser(res.data.user);
      onUpdate(res.data.message);
    } catch (error) {
      onError(error.response.data.message);
    }
  };
  return { updateUser };
};

export default useUser;
