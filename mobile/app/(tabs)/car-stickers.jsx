import { View, Text } from "react-native";
import React from "react";
import AppHeader from "../../components/common/AppHeader";
import TabsGradient from "../../components/gradients/TabsGradient";

const carStickers = () => {
  return (
    <View className="flex flex-1">
      <TabsGradient />
      <AppHeader />
    </View>
  );
};

export default carStickers;
