import { View, Text } from "react-native";
import React from "react";

const ErrorMessage = ({ msg }) => {
  return (
    <View className={msg === "" ? "hidden" : "block" + "w-100 mt-2 p-1"}>
      <Text className="text-xs text-red-400">{msg}</Text>
    </View>
  );
};

export default ErrorMessage;
