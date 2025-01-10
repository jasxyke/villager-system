import { useState } from "react";
import axiosClient from "../../utils/axios";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  // Function to request change of password
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
    } catch (error) {
      console.log(error.response.data);
      onError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    requestChangePassword,
  };
};

export default useChangePassword;
