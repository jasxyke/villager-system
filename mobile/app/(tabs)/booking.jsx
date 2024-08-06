import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";
import AppHeader from "../../components/common/AppHeader";

const Booking = () => {
  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <AppHeader />
      <Text>Booking</Text>
    </View>
  );
};

export default Booking;
