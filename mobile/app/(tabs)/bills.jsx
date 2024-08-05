import { View, Text, ScrollView } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";

const Bills = () => {
  return (
    <ScrollView className="flex-1 h-full">
      <TabsGradient />
      <AppHeader />
      <Text>Bills</Text>
    </ScrollView>
  );
};

export default Bills;
