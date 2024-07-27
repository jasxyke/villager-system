import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { formStyles } from "../../styles/formStyles";

const PasswordInput = ({ password, onChangePass }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View>
      <TextInput
        value={password}
        style={formStyles.textInput}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => {
          onChangePass(text);
        }}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        activeOpacity={0.5}
        style={{
          opacity: 0.5,
          position: "absolute",
          right: 10,
          top: 12,
        }}
      >
        <Feather
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
