import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import { formStyles } from "../../styles/formStyles";
import useUser from "../../hooks/users/useUser";

const ChangePassword = ({ onClose }) => {
  const { requestChangePassword, loading } = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const closeForm = () => {
    setOldPassword("");
    setNewPassword("");
    setPasswordConfirm("");
    onClose();
  };

  const handleSucess = (msg) => {
    setIsError(false);
    setResponseMsg(msg);
  };

  const handleError = (msg) => {
    setIsError(true);
    setResponseMsg(msg);
  };

  const changePass = () => {
    requestChangePassword(
      oldPassword,
      newPassword,
      passwordConfirm,
      handleSucess,
      handleError
    );
  };
  return (
    <View className="justify-center items-center pb-5">
      <View className="w-[90%] bg-paleGreen p-5 shadow-2xl rounded-lg">
        <Text className="text-2xl font-bold text-white mb-2">
          Change Password
        </Text>
        <View
          className={`mb-2 p-3 w-full rounded-lg ${
            isError ? "bg-red-500" : "bg-secondary"
          } ${responseMsg ? "block" : "hidden"}`}
        >
          <Text className="font-pRegular text-white">{responseMsg}</Text>
        </View>
        <View className="mb-2">
          <Text className="text-white text-base mb-1 font-pRegular">
            Old Password
          </Text>
          <PasswordInput password={oldPassword} onChangePass={setOldPassword} />
        </View>
        <View className="mb-2">
          <Text className="text-white text-base mb-1 font-pRegular">
            New Password
          </Text>
          <PasswordInput password={newPassword} onChangePass={setNewPassword} />
        </View>
        <View className="mb-2">
          <Text className="text-white text-base mb-1 font-pRegular">
            Confirm Password
          </Text>
          <PasswordInput
            password={passwordConfirm}
            onChangePass={setPasswordConfirm}
          />
        </View>
        <View className="flex-row justify-around mt-2 w-full">
          <TouchableOpacity
            disabled={loading}
            onPress={changePass}
            style={formStyles.button}
          >
            <Text style={formStyles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeForm}
            style={[formStyles.button, formStyles.closeButton]}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
