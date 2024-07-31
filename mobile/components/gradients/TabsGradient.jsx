import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const TabsGradient = () => {
  return (
    <LinearGradient
      colors={["#AEC09A", "#344C11"]}
      locations={[0.2, 1]}
      style={styles.background}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
  },
});
export default TabsGradient;
