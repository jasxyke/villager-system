import { View, Text } from "react-native";
import React from "react";

const AppText = ({ text, color = "white", size = "base" }) => {
  return (
    <Text className={`mb-3 font-pRegular text-${color} text-${size}`}>
      {text}
    </Text>
  );
};

export default AppText;
