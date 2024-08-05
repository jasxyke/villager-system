import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";

const Booking = () => {
  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <Text>Booking</Text>
    </View>
  );
};

export default Booking;
