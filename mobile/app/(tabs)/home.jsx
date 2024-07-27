import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TabsGradient from "../../components/gradients/TabsGradient";

const Home = () => {
  return (
    <View className="flex-1 h-full">
      <TabsGradient />
      <Text>Home</Text>
    </View>
  );
};

export default Home;
