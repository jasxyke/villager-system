import { View, Text } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";

const Market = () => {
  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <AppHeader />
      <Text>Market</Text>
    </View>
  );
};

export default Market;
