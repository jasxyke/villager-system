import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import TabsGradient from "../gradients/TabsGradient";

const LoadingScreen = () => {
  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

export default LoadingScreen;
