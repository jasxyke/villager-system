import React, { useState } from "react";
import axiosClient from "../../utils/axios";
import { useAuthContext } from "../../context/AuthContext";
import { Platform } from "react-native";

const useUser = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const updateUser = async (user, onUpdate, onError) => {
    setLoading(true);
    let userForm = null;
    userForm = {
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
      setLoading(false);
    } catch (error) {
      onError(error.response.data.message);
      setLoading(false);
    }
  };

  const changePicture = async (selectedPicture, onSuccess, onError) => {
    setLoading(true);
    const uri =
      Platform.OS === "android"
        ? selectedPicture.uri
        : selectedPicture.uri.replace("file://", "");
    const filename = selectedPicture.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("profile_pic", {
      uri,
      name: `image.${ext}`,
      type,
    });
    try {
      const res = await axiosClient.post(
        "/users/change-profile-pic",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      onSuccess(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      onError(error.response.data.message);
      setLoading(false);
    }
  };

  const requestChangePassword = async (
    oldPassword,
    newPassword,
    passWordConfirm,
    onSuccess,
    onError
  ) => {
    setLoading(true);
    const formData = {
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: passWordConfirm,
    };
    try {
      const res = await axiosClient.post("/users/change-password", formData);
      console.log(res.data.message);
      onSuccess(res.data?.message);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      onError(error.response.data.message);
      setLoading(false);
    }
  };
  return { updateUser, changePicture, requestChangePassword, loading };
};

export default useUser;
